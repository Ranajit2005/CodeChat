import { format } from "date-fns";


const ReciverMsg = (msg) => {
  const createdAt = msg?.msg?.createdAt; // ISO timestamp string
  const date = new Date(createdAt);

  const formattedTime = format(date, "hh:mm a");
  return (
    <div className="w-fit sm:max-w-[500px] max-w-[300px] px-3 py-1 bg-gradient-to-br from-[#3e6bff] to-[#5ae6ff] rounded-tl-none rounded-2xl text-black mx-3 my-5 relative shadow-lg shadow-gray-500">
      {msg?.msg?.image && (
        <img
          src={msg?.msg?.image}
          className="h-60 w-60"
          alt="network error"
        />
      )}
      {msg?.msg?.message && <span>{msg?.msg?.message}</span>}
      <div className=" flex items-center justify-end p-1">
        <span className="text-xs text-gray-700">{formattedTime}</span>
      </div>
    </div>
  );
};

export default ReciverMsg;