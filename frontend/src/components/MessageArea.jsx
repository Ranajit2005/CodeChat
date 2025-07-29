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
import { useEffect } from "react";


const MessageArea = () => { 
  const { selectedUser, userData, socket, onlineUsers } = useSelector((state) => state.user);
  const { messages = [], loadingMsg } = useSelector((state) => state.messages);

  const [showEmoji, setShowEmoji] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [image, setImage] = useState("");
  const [loadingImage, setLoadingImage] = useState(false);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const VITE_CLOUDNAME = import.meta.env.VITE_CLOUDNAME;

  const temporaryMsg = {
    image,
    message: inputMsg,
    createdAt: new Date().toISOString(),
    _id: Date.now().toString(), // Temporary ID
    sender: userData?._id,
    isTemp: true // Flag to identify temporary messages
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImage(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "codeChat");
    formData.append("cloud_name", VITE_CLOUDNAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUDNAME}/image/upload`,{
          method: "POST",
          body: formData,
        }
      );

      const uploadImage = await res.json();
      setImage(uploadImage.secure_url);
      setLoadingImage(false);

      toast("Image uploaded successfully!", {
        icon: "✅",
        style: {
          background: "#4ade80",
          color: "#fff",
        },
      });

    } catch (error) {
      console.error("Error uploading image:", error);
      setLoadingImage(false);
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

    // Add temporary message to UI immediately
    dispatch(setMessages([...messages, temporaryMsg]));
    setInputMsg("");
    setImage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/message/send/${selectedUser._id}`,
        { 
          image, 
          message: inputMsg
        },
        { withCredentials: true }
      );

      // Replace temporary message with real message from server
      dispatch(setMessages([
        ...messages.filter(msg => msg._id !== temporaryMsg._id),
        res?.data?.newMessage
      ]));

    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the temporary message if sending fails
      dispatch(setMessages(messages.filter(msg => msg._id !== temporaryMsg._id)));
      
      toast.error("Failed to send message", {
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  };

  useEffect(() => {
    socket.on("newMsg", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => socket.off("newMsg");
  }, [socket, messages, dispatch]);

  useEffect(() => {
    if (loadingImage) {
      toast.loading("Uploading image...", {
        id: "uploading-image",
        style: {
          background: "#4ade80",
          color: "#fff",
        },
      });
    } else {
      toast.dismiss("uploading-image");
    }
  }, [loadingImage]);

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
        <div className="relative bg-gradient-to-br from-purple-500 to-[#20c7ff] py-3 rounded-b-[30px] flex items-center justify-start gap-3 text-white pl-3 h-[70px]">
          <IoMdArrowRoundBack
            className="text-2xl cursor-pointer"
            onClick={() => {
              dispatch(setSelectedUser(null));
            }}
          />
          <img
            src={selectedUser?.image || "/chaticon.png"}
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover border-1"
            alt="🤔"
          />

          {/* Online status indicator */}
          {Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id) && (
            <div className="rounded-full bg-green-500 h-3 w-3 absolute left-19 bottom-3  border-1 shadow-md shadow-gray-700 border-black">
            </div>
          )}
          
          <div>
            <h1 className="text-xl">
              {selectedUser?.name || "select user for chat"}
            </h1>
            <p className="text-sm text-gray-900">
              @{selectedUser?.username}
            </p>
          </div>
        </div>

        {/* message input area */}
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
                  <div className="sm:max-w-52 sm:max-h-52 rounded-lg overflow-hidden border-2 border-indigo-500 shadow-lg">
                    <img
                      src={image}
                      alt="Profile"
                      className="max-h-52 max-w-52 object-contain p-1"
                    />
                  </div>
                </div>
              )}

              {/* image upload button */}
              <button onClick={() => fileInputRef.current.click()} type="button">
                <FaImage className="text-2xl text-white cursor-pointer" />
              </button>

              {/* send msg button, form button */}
              {(image || inputMsg.trim() !== "") && (
                <button type="submit">
                  <BsFillSendFill className="text-2xl text-white cursor-pointer" />
                </button>
              )}
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
        <div className="w-full h-[calc(100vh-70px)] lg:h-full mb-15 overflow-y-auto no-scrollbar">
          {messages?.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl text-gray-900">No messages yet</h1>
            </div>
          )}
          {messages?.map((msg) => {
            if (msg?.isTemp) {
              return (
                <div key={msg?._id} className="flex justify-end items-center gap-2 px-2 py-1">
                  <div className="bg-gradient-to-br from-[#82ff51] to-[#00bc19] text-white px-4 py-2 rounded-lg max-w-xs opacity-80">
                    {msg?.message}
                    {msg?.image && <img src={msg?.image} alt="Uploaded content" className="max-h-60 max-w-60 object-contain hover:scale-105 transition-transform duration-300 cursor-pointer rounded-md" />}
                  </div>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              );
            }
            
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