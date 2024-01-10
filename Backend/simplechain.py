from langchain_community.llms import CTransformers
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# Cau hinh
model_file = "models/vinallama-7b-chat_q5_0.gguf"

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
    prompt = PromptTemplate(template = template, input_variables=["question"])
    return prompt

# Create Simple Chain
def create_simple_chain(prompt, llm):
    llm_chain = LLMChain(prompt = prompt, llm = llm)
    return llm_chain

# Test Chain

template = """<|im_start|>system
Bạn là một trợ lí AI hữu ích. Hãy trả lời người dùng một cách chính xác.
<|im_end|>
<|im_start|>user
{question}<|im_end|>
<|im_start|>assistant"""

prompt =  create_prompt(template)
llm = load_llm(model_file)
llm_chain = create_simple_chain(prompt, llm)

question = "Một cộng một bằng mấy ?"
response = llm_chain.invoke({"question": question})
print(response)