import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import { useSelector } from "react-redux";
import Landing from "../components/Landing";
import useMessage from "../CustomHooks/useMessage";


const Home = () => {
  const { selectedUser } = useSelector((state) => state.user);
  useMessage();
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      {selectedUser === null ? <Landing /> : <MessageArea />}
    </div>
  );
};

export default Home;