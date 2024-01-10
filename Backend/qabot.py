from langchain_community.llms import CTransformers
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_community.embeddings import GPT4AllEmbeddings
from langchain_community.vectorstores import FAISS

model_file = "models/vinallama-7b-chat_q5_0.gguf"
vector_db_path = "vectorstores/db_faiss"

# load LLM
def load_llm(model_file):
    llm = CTransformers(
        model = model_file,
        model_type = "llama",
        max_new_tokens = 1024,
        temperature = 0.01
    )
    return llm

# Create prompt tmp
def create_prompt(template):
    prompt = PromptTemplate(template = template, input_variables=["context", "question"])
    return prompt

# Create Simple Chain
def create_qa_chain(prompt, llm, db):
    llm_chain = RetrievalQA.from_chain_type(
        llm = llm,
        chain_type = "stuff",
        retriever = db.as_retriever(search_kwargs = {"k":3}, max_tokens_limit = 1024),
        return_source_documents = False,
        chain_type_kwargs= {"prompt":prompt}
    )
    return llm_chain

# Read from vectorDB
def read_vectors_db():
    # Embedding
    embedding_model = GPT4AllEmbeddings(model_file = "models/all-MiniLM-L6-v2-f16.gguf")
    db = FAISS.load_local(vector_db_path, embedding_model)
    return db

# test
db = read_vectors_db()
llm = load_llm(model_file)

# prompt
template = """<|im_start|>system\nSử dụng thông tin sau đây để trả lời câu hỏi. Nếu bạn không biết câu trả lời, hãy nói không biết, đừng cố tạo ra câu trả lời.\n
{context}<|im_end|>\n<|im_start|>user\n{question}<|im_end|>\n<|im_start|>assistant"""

prompt = create_prompt(template)

llm_chain = create_qa_chain(prompt, llm, db)

# Run chain
question = "Kháng chiến toàn diện là gì ?"
response = llm_chain.invoke({"query": question})
print(response)