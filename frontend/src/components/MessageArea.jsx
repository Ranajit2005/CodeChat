import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setSelectedUser } from "../features/userSlice";


const MessageArea = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log("userData in MessageArea:", userData);

  // console.log("selectedUser in MessageArea:", selectedUser);

  return (
    <div className={`lg:w-2/3 w-full h-full ${selectedUser === null ? "hidden" : "flex"} lg:block overflow-hidden relative`}>

      {/* background Image */}
      <div 
        className="absolute inset-y-0 right-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/chatImage.jpeg')` }}
      ></div>

      {/* Overlay, for absolute */}
      <div className="absolute w-full z-10 h-full flex flex-col">

        
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-500 to-[#20c7ff] py-3 rounded-b-[30px] flex items-center justify-start gap-3 text-white pl-3">
          <IoMdArrowRoundBack
            className="text-2xl cursor-pointer"
            onClick={() => {dispatch(setSelectedUser(null))}}
          />
          <img
            src={selectedUser?.image || "/chaticon.png"}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
            alt="🤔"
          />
          <h1 className="text-xl">{selectedUser?.username || "select user for chat"}</h1>
        </div>

      


      </div>
    </div>
  );
};

export default MessageArea;
