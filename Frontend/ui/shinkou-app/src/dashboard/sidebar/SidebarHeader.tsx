import { ChatbotUISVG } from "@/components/icon/chatbotui-svg";
import { useTheme } from "next-themes"


export function SidebarHeader() {
  const { theme } = useTheme()

  return (
    <div className="flex h-20 items-center justify-start pl-4 lg:pl-8">
      <ChatbotUISVG theme={theme === "light" ? "light" : "dark"} scale={0.2} />
      <div className="mt-2 ml-4 text-2xl font-bold text-white">Chatbot UI</div>
    </div>
  );
}
