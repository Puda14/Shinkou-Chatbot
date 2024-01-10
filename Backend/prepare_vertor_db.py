from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import GPT4AllEmbeddings


# from langchain_openai import OpenAIEmbeddings

pdf_data_path = "data"
vector_db_path = "vectorstores/db_faiss"

def create_db_from_text():

    raw_tex = """Trong thời đại ngày nay, trí tuệ nhân tạo (AI) đã trở thành một chủ đề quan trọng và động
      lực mạnh mẽ cho sự phát triển công nghệ. AI không chỉ là một đối tác không thể thiếu trong cuộc 
      sống hàng ngày mà còn đóng vai trò quan trọng trong nhiều lĩnh vực, từ kinh tế đến y tế và giáo dục.
        Một trong những ứng dụng quan trọng nhất của AI là trong lĩnh vực y tế. Hệ thống AI có khả năng
          phân tích dữ liệu y tế lớn và phức tạp, từ đó hỗ trợ bác sĩ đưa ra chẩn đoán chính xác và tối ưu 
          hóa quy trình điều trị. Ngoài ra, AI còn có thể dự đoán các đợt bùng phát dịch bệnh và đưa ra các
            biện pháp phòng ngừa hiệu quả. Điều này không chỉ giúp cải thiện chất lượng chăm sóc sức khỏe
              mà còn đóng góp vào việc kiểm soát và phòng chống bệnh dịch trên quy mô toàn cầu. Trong lĩnh
                vực kinh tế, AI đóng vai trò quan trọng trong việc tối ưu hóa quy trình sản xuất và quản 
                lý chuỗi cung ứng. Hệ thống tự động có khả năng dự đoán nhu cầu thị trường, giảm thiểu 
                lãng phí và tối ưu hóa lợi nhuận. Ngoài ra, AI cũng chơi một vai trò lớn trong tài chính
                  và ngân hàng, từ việc phân tích dữ liệu tài chính đến quản lý rủi ro và giao dịch tự động. 
                  Tuy nhiên, việc sử dụng AI cũng đặt ra nhiều thách thức và lo ngại. Một số người lo lắng về việc mất 
                  việc làm do tự động hóa, trong khi người khác đề xuất các biện pháp an ninh để ngăn chặn lạm dụng
                    thông tin cá nhân. Ngoài ra, quá trình đào tạo và phát triển các hệ thống AI cần sự chú ý đặc biệt
                      để đảm bảo tính minh bạch và công bằng trong quá trình ra quyết định. Trong khi AI mang lại nhiều 
                      lợi ích, chúng ta cũng cần đối mặt với trách nhiệm đạo đức và pháp lý để đảm bảo rằng sức mạnh của
                        nó được sử dụng một cách an toàn và có ý thức. Sự phát triển của AI không chỉ là một thách thức cho giới khoa học
                          công nghệ mà còn là một cơ hội để xây dựng một tương lai thông minh và bền vững."""

    # Chia nho van ban
    text_splitter = CharacterTextSplitter(
        separator = "\n",
        chunk_size = 512,
        chunk_overlap=50,
        length_function = len
    )
    
    chunks = text_splitter.split_text(raw_tex)

    # Embedding
    embedding_model = GPT4AllEmbeddings(model_file = "models/all-MiniLM-L6-v2-f16.gguf")

    # Dua vao Faiss Vector DB
    db = FAISS.from_texts(texts = chunks, embedding = embedding_model)
    db.save_local(vector_db_path)
    return db

def create_db_from_files():
    #Khai bao loader de quet toan bo thu muc dataa
    loader = DirectoryLoader (pdf_data_path, glob="*.pdf", loader_cls = PyPDFLoader)
    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)
    
    #Embeding
    embedding_model = GPT4AllEmbeddings(model_file="models/all-MiniLM-L6-v2-f16.gguf")
    db = FAISS.from_documents(chunks, embedding_model)
    db.save_local(vector_db_path)
    return db

create_db_from_files()