import { IconBook, IconBrandWechat, IconMessageChatbot, IconNotebook, IconUpload } from "@tabler/icons-react";


export const data = [
  {
    section: "Apps",
    content: [
      {
        title: "Discussion",
        icon: <IconMessageChatbot />,
        link: "/",
      },
      {
        title: "Document Upload",
        icon: <IconUpload />,
        link: "/apps/upload",
      },
      {
        title: "Educational Roadmap",
        icon: <IconBook/>,
        link: "/apps/roadmap",
      },
    ],
  }
];
