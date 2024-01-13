import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { IconUpload } from "@tabler/icons-react";

interface Props {
  dirs: string[];
}

const FileUploadUI: NextPage<Props> = ({ dirs }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/fileupload_api", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center mt-6 h-77vh rounded-2xl">
      <label>
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedImage(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <div className="w-80vh p-3 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed cursor-pointer">
          <IconUpload
          size={50}
          />
          <span>Click to upload file</span>
        </div>
      </label>
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ opacity: uploading ? ".5" : "1" }}
        className="bg-gray-900 mt-8 p-3 w-32 text-center rounded text-white"
      >
        {uploading ? "Uploading.." : "Upload"}
      </button>
      <div className="mt-20 flex flex-col space-y-3">
        {dirs.map((item) => (
          <Link key={item} href={"/images/" + item}>
            <a className="text-blue-500 hover:underline">{item}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FileUploadUI;