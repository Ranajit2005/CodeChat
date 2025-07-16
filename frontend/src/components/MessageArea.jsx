import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setSelectedUser } from "../features/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImage } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { useState } from "react";
import EmojiPicker from 'emoji-picker-react';


const MessageArea = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputMsg, setInputMsg] = useState("");

  const getEmoji = (emojiData) => {
    setInputMsg((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  }


  // console.log("userData in MessageArea:", userData);

  // console.log("selectedUser in MessageArea:", selectedUser);

  return (
    <div
      className={`lg:w-2/3 w-full h-full ${
        selectedUser === null ? "hidden" : "flex"
      } lg:block overflow-hidden relative`}
    >
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
            onClick={() => {
              dispatch(setSelectedUser(null));
            }}
          />
          <img
            src={selectedUser?.image || "/chaticon.png"}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
            alt="🤔"
          />
          <h1 className="text-xl">
            {selectedUser?.username || "select user for chat"}
          </h1>
        </div>

        {/* meggase input area */}
        <div className="w-full lg:w-[70%] h-[100px] fixed bottom-0 flex items-center justify-center">
          <form className="w-[95%] lg:max-w-[70%] h-[50px] shadow-gray-500 shadow-lg rounded-full bg-blue-500 flex items-center justify-between px-3" onSubmit={(e) => {
            e.preventDefault()}}>

            {/* emoji and input area */}
            <div className="flex w-full items-center justify-center gap-3">
              <RiEmojiStickerLine className="text-3xl text-white cursor-pointer" onClick={()=>setShowEmoji(prev=>!prev)} />
              <input
                type="text"
                placeholder="type message here..."
                className="h-full w-full bg-transparent text-white placeholder:text-white outline-none pr-5"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
              />
            </div>

            {/* image and send button */}
            <div className="flex items-center gap-3 pr-3">
              <FaImage className="text-2xl text-white cursor-pointer" />
              <BsFillSendFill className="text-2xl text-white cursor-pointer" />
            </div>
          </form>
        </div>
        {/* Emoji picker */}
        {showEmoji && (
          <div className="absolute bottom-[90px] left-5 z-20">
              <EmojiPicker width={300} height={350} theme="dark" previewConfig={{ showPreview: false }}                 onEmojiClick={getEmoji}
              className="shadow-lg shadow-gray-500"/>
          </div>
        )}


      </div>
    </div>
  );
};

export default MessageArea;
