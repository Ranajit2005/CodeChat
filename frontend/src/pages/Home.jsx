import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import { useSelector } from "react-redux";
import Landing from "../components/Landing";
import Loader from "../components/Loader";


const Home = () => {
  const { selectedUser } = useSelector((state) => state.user);

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      {selectedUser === null ? <Landing /> : <MessageArea />}
    </div>
  );
};

export default Home;