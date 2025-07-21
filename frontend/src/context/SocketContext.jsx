import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext";

const SocketProvider = ({ children }) => {
  const { userData } = useSelector((state) => state.user);

  const [isConnected, setIsConnected] = useState(false);
  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    query: {
      userId: userData?._id,
    },
  });
  useEffect(() => {
    if (!userData) {
      socket?.close();
      // dispatch(setSocket(null));
      return;
    }

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, userData]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
export { default as SocketProvider } from "./SocketConjext.js";