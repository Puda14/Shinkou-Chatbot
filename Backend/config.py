import os

from dotenv import load_dotenv
import openai
from langchain_openai import AzureOpenAI
from langchain_openai import AzureOpenAIEmbeddings
from langchain_openai import AzureChatOpenAI

load_dotenv()


def init_client():
    client = AzureOpenAI(azure_endpoint=os.getenv('AZURE_ENDPOINT'),
                         api_key=os.getenv('AZURE_API_KEY'),
                         api_version=os.getenv('AZURE_API_VERSION'))
    return client


def init_chat_model():
    llm = AzureChatOpenAI(azure_endpoint=os.getenv('AZURE_ENDPOINT'),
                          api_key=os.getenv('AZURE_API_KEY'),
                          api_version=os.getenv('AZURE_API_VERSION'),
                          model=os.getenv('CHAT_MODEL_NAME'))
    return llm


def init_embedding_model():
    embedding = AzureOpenAIEmbeddings(azure_endpoint=os.getenv('AZURE_ENDPOINT'),
                                      api_key=os.getenv('AZURE_API_KEY'),
                                      api_version=os.getenv('AZURE_API_VERSION'),
                                      model=os.getenv('EMBEDDING_MODEL_NAME'))
    return embedding
