import { format } from "date-fns";
import { useEffect } from "react";
import { useRef } from "react";


const SenderMsg = (msg) => {
  const createdAt = msg.msg.createdAt; // ISO timestamp string
  const date = new Date(createdAt);
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const formattedTime = format(date, "hh:mm a");
  return (
    <div className="w-fit sm:max-w-[500px] max-w-[300px] px-1 pb-1 pt-2 bg-gradient-to-br from-[#82ff51] to-[#00bc19] rounded-tr-none rounded-2xl text-black m-3 relative right-0 ml-auto shadow-lg shadow-gray-500"
      ref={scroll} >
      {msg?.msg?.image && (
        <a href={msg?.msg?.image} target="_blank" rel="noopener noreferrer">
          <img
            src={msg?.msg?.image}
            className="max-h-60 max-w-60 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer rounded-md"
            alt="network error"
          />
        </a>
      )}

      {msg?.msg?.message && <span>{msg?.msg?.message}</span>}
      <div className=" flex items-center justify-end">
        <span className="text-xs text-gray-700 pl-5">{formattedTime}</span>
      </div>
    </div>
  );
};

export default SenderMsg;