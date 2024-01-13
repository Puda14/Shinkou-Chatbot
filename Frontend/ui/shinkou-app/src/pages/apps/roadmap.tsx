import RoadmapUI from "@/components/RoadmapUI";
import { Content } from "../../components/Content";

export default function RoadmapPage() {
  return (
    <div>
      <Content title="Educational Roadmap" />
      <div
        style={{ backgroundColor: "rgb(146 151 179 / 13%)" }}
        className="mt-4 rounded-2xl p-4 font-normal"
      >
        <RoadmapUI />
      </div>
    </div>
  );
}
