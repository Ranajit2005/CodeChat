import { Routes,Route, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import useCurrentUser from "./CustomHooks/useCurrentUser"
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Profile from "./pages/Profile";
import Loader from "./components/Loader";
import useOtherUsers from "./CustomHooks/useOtherUser";


function App() {

  const { userData,loading } = useSelector((state) => state.user);

  useCurrentUser();
  useOtherUsers();
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