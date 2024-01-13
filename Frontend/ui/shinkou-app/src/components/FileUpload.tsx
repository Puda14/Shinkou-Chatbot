// import { useEdgeStore } from "@/lib/edgestore";
// import { IconUpload, IconX } from "@tabler/icons-react"
// import axios from "axios";
// import { url } from "inspector";
// import Link from "next/link";
// import { useState } from "react";

// export const SIDEBAR_ICON_SIZE = 100

// export default function FileUpload() {
//   const [file, setFile] = useState<File>();
//   const [urls, setUrls] = useState<{
//     url: string;
//     size: number;
//   }>();
//   const { edgestore } = useEdgeStore();

//   // const handleUpload = async () => {
//   //   setUploading(true);
//   //   try {
//   //     if (!file) return;
//   //     const formData = new FormData();
//   //     formData.append("myImage", file);
//   //     const { data } = await axios.post("/api/image", formData);
//   //     console.log(data);
//   //   } catch (error: any) {
//   //     console.log(error.response?.data);
//   //   }
//   //   setUploading(false);
//   // };
  
//   return (
//     // <div className="container mx-auto">
//     //   <div className="relative flex flex-col items-center justify-center h-77vh bg-gray-900 rounded-2xl">
//     //     <IconUpload
//     //     className="cursor-pointer hover:opacity-50 "
//     //     size={SIDEBAR_ICON_SIZE}
//     //     onClick={() => setIsOpen(true)}
//     //     />

//     //     <div className="mt-6 text-4xl font-semibold">Upload PDF File</div>

        
//     //     </div>
        
//     // </div>
//     <div className="flex flex-col items-center m-6 gap-2">
//       <input type="file" onChange={(e) => {
//         setFile(e.target.files?.[0]);
//       }}/>

//       <button
//         className="bg-white text-black rounded px-2 hover:opacity-80"
//         onClick={async () => {
//           if (file) {
//             const res = await edgestore.myPublicImages.upload({file});
//             setUrls({
//               url: res.url,
//               size: res.size,
//             });
//           }
//         }}
//       >
//         Upload
//       </button>
//       {urls?.url && <Link  href={urls.url} target="_blank">URL</Link>}
//       {urls?.size}
//     </div>
//   );
// }
