import { Content } from "../../components/Content";
import { MultiFileDropzoneUsage } from "@/components/MultiFileUpload";
// import FileUpload from "@/components/FileUpload";

export default function UploadPage() {
  return (
    <div>
      <Content title="Document Upload" />
      <div
        style={{ backgroundColor: "rgb(146 151 179 / 13%)" }}
        className="mt-4 rounded-2xl p-4 font-normal"
      >
        <MultiFileDropzoneUsage />
      </div>
    </div>
  );
}

