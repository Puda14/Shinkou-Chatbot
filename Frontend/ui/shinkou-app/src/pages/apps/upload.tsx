import FileUploadUI from "@/components/FileUploadUI";
import { Content } from "../../components/Content";
import axios from "axios";
// import FileUpload from "@/components/FileUpload";

export default function UploadPage() {
  return (
    <div>
      <Content title="Document Upload" />
      <div
        style={{ backgroundColor: "rgb(146 151 179 / 13%)" }}
        className="mt-4 rounded-2xl p-4 font-normal"
      >
        <FileUploadUI dirs={[]}/>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('/api/fileupload_api');
    const dirs = response.data.files;
    return { props: { dirs } };
  } catch (error) {
    return { props: { dirs: [] } };
  }
}


