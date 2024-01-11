import ChatUI from "./ChatUI";

interface ContentProps {
  title: string;
}

export function Content({ title }: ContentProps) {
  return (
    <div>
      <div
        className="flex w-full flex-wrap items-center justify-between rounded-2xl px-12 py-6 md:flex-nowrap"
        style={{
          backgroundColor:
            "url('https://www.transparenttextures.com/patterns/cubes.png')",
          backgroundImage:
            "linear-gradient(to right top, #cf4af3,#e73bd7, #f631bc,#fd31a2,#ff3a8b, #ff4b78,#ff5e68,#ff705c,#ff8c51,#ffaa49,#ffc848,#ffe652)",
        }}
      >
        <div>
          <h3 className="m-0 flex items-center text-2xl font-medium">
            {title}
          </h3>
        </div>
      </div>
      <div
        style={{ backgroundColor: "rgb(146 151 179 / 13%)" }}
        className="mt-4 rounded-2xl p-4 font-normal"
      >
        <ChatUI />
      </div>
    </div>
  );
}
