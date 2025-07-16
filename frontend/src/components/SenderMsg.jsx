import { format } from "date-fns";


const SenderMsg = () => {
  const createdAt = "2025-07-16T20:15:00.000Z"; // ISO timestamp string
  const date = new Date(createdAt);

  const formattedTime = format(date, "hh:mm a");
  return (
    <div className="w-fit sm:max-w-[500px] max-w-[300px] px-3 py-1 bg-gradient-to-br from-[#82ff51] to-[#00bc19] rounded-tr-none rounded-2xl text-black m-3 relative right-0 ml-auto shadow-lg shadow-gray-500">
      <img src="/chaticon.png" className="h-60 w-60 rounded-full" alt="🤔" />
      <span>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit deserunt
        architecto ipsum quaerat provident optio ea necessitatibus, earum
        exercitationem tempora incidunt iste soluta quam eius molestias maxime
        dicta nobis dignissimos, reiciendis neque. Facere, aliquam placeat
        magnam quibusdam error eum ex.{" "}
      </span>
      <div className=" flex items-center justify-end p-1">
        <span className="text-xs text-gray-700">{formattedTime}</span>
      </div>
    </div>
  );
};

export default SenderMsg;
