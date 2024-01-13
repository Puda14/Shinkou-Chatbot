import json

from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
import config

vector_db_path = "vectorstores/db_faiss"

llm = config.init_chat_model()
embedding = config.init_embedding_model()


# load LLM



# Create prompt tmp
def create_prompt(template):
    prompt = PromptTemplate(template=template, input_variables=["context", "question"])
    return prompt


# Create Simple Chain
def create_qa_chain(prompt, llm, db):
    llm_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=db.as_retriever(search_kwargs={"k": 4}, max_tokens_limit=1024),
        return_source_documents=False,
        chain_type_kwargs={"prompt": prompt}
    )
    return llm_chain


# Read from vectorDB
def read_vectors_db():
    # Embedding
    embedding_model = embedding
    db = FAISS.load_local(vector_db_path, embedding_model)
    return db


# test
db = read_vectors_db()

# prompt
template = """<|im_start|>system\nSử dụng thông tin sau đây để trả lời câu hỏi. Nếu bạn không biết câu trả lời, hãy nói không biết, đừng cố tạo ra câu trả lời.\n
{context}<|im_end|>\n<|im_start|>user\n{question}<|im_end|>\n<|im_start|>assistant"""

prompt = create_prompt(template)

llm_chain = create_qa_chain(prompt, llm, db)

# Run chain
question = ("Hội nghị Trung ương 8 của Đảng Cộng sản Đông Dương diễn ra ở đâu?")
response = llm_chain.invoke({"query": question})
print(json.dumps(response,indent=4,ensure_ascii=False))
