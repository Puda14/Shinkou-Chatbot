import { useTheme } from "next-themes"


export function SidebarHeader() {
  const { theme } = useTheme()

  return (
    <div className="flex h-20 items-center justify-start pl-4 lg:pl-8">
      <img src="/AppIcon.png" alt=""
           style={{width:60}}
           className="mt-2"
      />
      <div className="mt-2 ml-4 text-3xl font-bold text-white">Shinkō</div>
    </div>
  );
}
