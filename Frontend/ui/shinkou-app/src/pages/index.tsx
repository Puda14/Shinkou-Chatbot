import ChatUI from "@/components/ChatUI";
import { Content } from "../components/Content";

export default function HomePage() {
  return (
    <div>
      <Content title="Discussion" />
      <div
        style={{ backgroundColor: "rgb(146 151 179 / 13%)" }}
        className="mt-4 rounded-2xl p-4 font-normal"
      >
        <ChatUI />
      </div>
    </div>
  );
}
