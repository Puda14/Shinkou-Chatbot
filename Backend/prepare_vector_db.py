from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_community.vectorstores import FAISS
import config

pdf_data_path = "data"
vector_db_path = "vectorstores/db_faiss"

embedding = config.init_embedding_model()






def create_db_from_files():
    # Khai bao loader de quet toan bo thu muc dataa
    loader = DirectoryLoader(pdf_data_path, glob="*.pdf", loader_cls = PyPDFLoader)
    documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=512,
                                                   chunk_overlap=50,
                                                   separators=["\n\n", "\n", ". ", " ", ""])
    chunks = text_splitter.split_documents(documents)

    # Embeding
    embedding_model = embedding
    db = FAISS.from_documents(chunks, embedding_model)
    db.save_local(vector_db_path)
    return db


create_db_from_files()
