import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { setSelectedUser } from "../features/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImage } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import SenderMsg from "./SenderMsg";
import ReciverMsg from "./ReciverMsg";
import toast from "react-hot-toast";
import Loader from "./Loader";
import axios from "axios";
import { setMessages } from "../features/messageSlice";


const MessageArea = () => {
  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messages, loadingMsg } = useSelector((state) => state.messages);

  const [showEmoji, setShowEmoji] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const VITE_CLOUDNAME = import.meta.env.VITE_CLOUDNAME;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      toast.error("Image size must be under 1MB", {
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "codeChat");
    formData.append("cloud_name", VITE_CLOUDNAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUDNAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadImage = await res.json();
      setImage(uploadImage.secure_url);
      setLoading(false);

      toast("Image uploaded successfully!", {
        icon: "✅",
        style: {
          background: "#4ade80",
          color: "#fff",
        },
      });

    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      toast.error("Failed to upload image", {
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  };

  const getEmoji = (emojiData) => {
    setInputMsg((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (image == "" && inputMsg.trim() === "") return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/send/${selectedUser._id}`,{ 
          image, message: inputMsg
        },{ withCredentials: true }
      );

      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setInputMsg("");
      setImage("");

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message", {
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  };
  

  if (loading) return <Loader />;
  if (loadingMsg) return <Loader />;

  return (
    <div
      className={`lg:w-2/3 w-full h-full ${selectedUser === null ? "hidden" : "flex"} lg:block overflow-hidden relative`}>

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
        <div className=" z-50 w-full lg:w-[70%] h-[100px] fixed bottom-0 flex items-center justify-center">
          <form
            className="w-[95%] lg:max-w-[70%] h-[50px] shadow-gray-500 shadow-lg rounded-full bg-blue-500 flex items-center justify-between px-3"
            onSubmit={handleSendMessage}
          >

            {/* emoji and input area */}
            <div className="flex w-full items-center justify-center gap-3">
              <RiEmojiStickerLine
                className="text-3xl text-white cursor-pointer"
                onClick={() => setShowEmoji((prev) => !prev)}
              />

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

              {/* image upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* send time image show popup */}
              {image && (
                <div className="fixed bottom-[90px] right-5 sm:right-15 ">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden border-4 border-indigo-500 shadow-lg">
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover p-1"
                    />
                  </div>
                </div>
              )}

              {/* image upload button */}
              <button onClick={() => fileInputRef.current.click()}>
                <FaImage className="text-2xl text-white cursor-pointer" />
              </button>

              {/* send msg button, form button */}
              <button>
                <BsFillSendFill className="text-2xl text-white cursor-pointer" />
              </button>
            </div>
          </form>
        </div>

        {/* Emoji picker */}
        {showEmoji && (
          <div className="absolute bottom-[90px] left-5 z-20">
            <EmojiPicker
              width={300}
              height={350}
              theme="dark"
              previewConfig={{ showPreview: false }}
              onEmojiClick={getEmoji}
              className="shadow-lg shadow-gray-500"
            />
          </div>
        )}

        {/* Messages chat area */}
        <div className="w-full h-full overflow-auto no-scrollbar">
          {messages?.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl text-gray-900">No messages yet</h1>
            </div>
          )}

          {messages?.map((msg) => {
            return msg?.sender === userData?._id ? (
              <SenderMsg key={msg?._id} msg={msg} />
            ) : (
              <ReciverMsg key={msg?._id} msg={msg} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageArea;