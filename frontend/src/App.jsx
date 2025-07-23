import { Routes,Route, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import useCurrentUser from "./CustomHooks/useCurrentUser"
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Profile from "./pages/Profile";
import Loader from "./components/Loader";
import useOtherUsers from "./CustomHooks/useOtherUser";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { setOnlineUsers, setSocket } from "./features/userSlice";


function App() {

  const dispatch = useDispatch();

  const { userData,loading,socket } = useSelector((state) => state.user);

  useCurrentUser();
  useOtherUsers();

  useEffect(()=>{
    if(!userData) {
      socket?.close();
      dispatch(setSocket(null));
      return;
    }
    const socketio = io(import.meta.env.VITE_BACKEND_URL,{
      query:{
        userId: userData?._id,
      }
    });

    dispatch(setSocket(socketio));

    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });
    
    return () => socketio.close();
  },[userData,dispatch]);

  if (loading) return <Loader/>;

  return (
      <Routes>
        <Route path="/login" element={!userData ? <LogIn/> : <Navigate to='/'/>} />
        <Route path="/signup" element={!userData ? <SignUp/> : <Navigate to='/'/>} />
        <Route path="/profile" element={userData ? <Profile/> : <Navigate to='/login'/>} />
        <Route path="/" element={userData ? <Home/> : <Navigate to='/login'/>} />
      </Routes>
  )
}

export default App