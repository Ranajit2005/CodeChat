import { useDispatch, useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { setOtherUsers, setSearchUser, setSelectedUser, setUserData } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "./Loader";


const Sidebar = () => {
  const { userData, otherUsers,selectedUser,loading,onlineUsers,searchUsers } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,{
          withCredentials: true,
        }
      );

      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));

      if (res.data.success) {
        toast(res.data.message, {
          icon: "✅",
          style: {
            background: "#4ade80",
            color: "#fff",
          },
        });
      }

      navigate("/login");
    } catch (error) {
      if (error?.response?.data?.message) {
        toast(error.response.data.message, {
          icon: "❌",
          style: {
            background: "#f87171",
            color: "#fff",
          },
        });
      }
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/search?query=${searchTxt}`, {
        withCredentials: true,
      });

      dispatch(setSearchUser(res?.data?.users));
      console.log("Search Results:", searchUsers);
      // setSearchTxt("");

    } catch (error) {
      console.error("Error searching user:", error);
      toast.error("Failed to search user", {
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  }

  useEffect(() => {
    if (searchTxt) {handleSearch();}
    if(searchTxt == ""){
      setSearch(false);
      dispatch(setSearchUser(null));
    }
  }, [searchTxt]);

  if(loading) return <Loader/>

  return (
    <div className={`lg:w-1/3 w-full h-full lg:block ${selectedUser === null ? "block" : "hidden"} bg-gradient-to-br from-purple-100 to-[#63d8ff]`}>
      <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-[#20c7ff] py-1 flex items-center justify-center gap-3 text-black">
          <img
            src="/chaticon.png"
            className="h-8 w-8 sm:h-10 sm:w-10"
            alt="Chat Icon"
          />
          <h1 className="text-xl sm:text-2xl font-bold">CodeChat</h1>
        </div>

        {/* show user details */}
        <div className="flex items-center justify-between my-1 lg:px-3 px-1">
          <div>
            <h1 className="text-xl font-bold text-black text-center">
              Hii, {userData?.name}
            </h1>
            <a
              href="/profile"
              className="lg:text-sm text-xs text-black cursor-pointer"
            >
              @{userData?.username}
            </a>
          </div>

          <a
            href="/profile"
            className="flex justify-center items-center bg-white rounded-full p-0"
          >
            <img
              src={userData?.image}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover cursor-pointer 
           shadow-lg shadow-gray-700 hover:shadow-xl hover:shadow-gray-600
           border-1 border-white hover:scale-105 transition-all duration-200"
            />
          </a>
        </div>

        {/* Search and Other Users */}
        <div className="flex items-center justify-between px-5 pt-3 ">
          {/* Search */}
          <div className="flex items-center">
            <AnimatePresence mode="wait">
              {!search ? (
                <motion.div
                  key="search-icon"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearch(true)}
                  className="rounded-full cursor-pointer overflow-hidden bg-white p-2 shadow-lg shadow-gray-400"
                >
                  <IoSearchOutline className="text-2xl" />
                </motion.div>
              ) : (
                <motion.form
                  key="search-bar"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="flex items-center justify-start pl-3 gap-1 bg-white rounded-full py-1 shadow-lg shadow-gray-400 h-9 overflow-hidden"
                >
                  <IoSearchOutline className="text-2xl flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search User"
                    className="h-full bg-transparent outline-none w-full px-1"
                    value={searchTxt}
                    onChange={(e) => setSearchTxt(e.target.value)}
                  />
                  <RxCross2
                    className="text-xl cursor-pointer flex-shrink-0"
                    onClick={() => {
                      setSearch(false);
                    }}
                  />
                </motion.form>
              )}
            </AnimatePresence>
          </div>

         

          {/* Online Users */}
          {otherUsers && otherUsers.length > 0 && !search && (
            <div className="flex items-center gap-3 pb-2">
              {otherUsers.slice(-5).map((user) => (
                Array.isArray(onlineUsers) && onlineUsers.includes(user?._id) && (
                  <div key={user?._id} className="relative group" onClick={() => dispatch(setSelectedUser(user))}>
                  <div className="flex items-center gap-2 bg-white rounded-full shadow-lg shadow-gray-400 cursor-pointer">
                    <img
                      src={user?.image}
                      alt={user?.username}
                      className="w-12 h-12 rounded-full object-cover cursor-pointer 
           shadow-lg shadow-gray-700 hover:shadow-xl hover:shadow-gray-600
           border-1 border-white hover:scale-105 transition-all duration-200"
                    />
                  </div>
                  {/* green dot for online users */}
                  <div className="rounded-full bg-green-500 h-3 w-3 absolute right-0 bottom-0 border-1 shadow-md shadow-gray-700">
                  </div>
                  {/* Tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                    @{user?.username}
                    <div className="absolute bottom-full left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                  </div>
                </div>
                )
              ))}
            </div>
          )}
        </div>

          <div className="relative">
            {/* Search Results */}
            {Array.isArray(searchUsers) && search && searchUsers && searchUsers.length > 0 ? (
              <div className="absolute z-50 bg-white ml-5 rounded-lg mt-1">
                { searchUsers.map((user) => (
                  <div
                    key={user?._id}
                    onClick={()=>{dispatch(setSelectedUser(user)); setSearchTxt("")}}
                    className="relative flex items-center gap-2 hover:bg-blue-300 transition-colors duration-200 shadow-md shadow-gray-300 cursor-pointer w-[250px] hover:rounded-lg"
                  >
                    <img
                      src={user?.image}
                      alt={user?.username}
                      className="w-10 h-10 rounded-full shadow-lg shadow-gray-700 cursor-pointer my-auto ml-3"
                    />
                    <div className="flex flex-col gap-0 py-2">
                      <h2 className="text-sm font-semibold text-black">
                        {user?.name}
                      </h2>
                      <p className="text-xs">{user?.username}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              search && searchTxt != "" && (
                <div className="flex items-center justify-center absolute z-50 px-1 bg-white ml-5 rounded-lg mt-1 w-[250px] h-10">
                  <p className="text-gray-700">No users found</p>
                </div>
              )
            )}
          </div>

      </div>

      {/* user Chat Section */}
      <div className="overflow-y-auto h-[calc(100vh-200px)] no-scrollbar">
        {otherUsers && otherUsers.length > 0 ? (
          <div className=" overflow-y-auto scrollbar-hide px-1">
            {otherUsers.map((user) => (
              <div
                key={user?._id}
                onClick={()=>{dispatch(setSelectedUser(user))}}
                className="relative flex items-center gap-3  hover:bg-blue-300 transition-colors duration-200 rounded-full shadow-md shadow-gray-300 cursor-pointer my-1 pl-1"
              >
                <img
                  src={user?.image}
                  alt={user?.username}
                  className="w-12 h-12 rounded-full object-cover cursor-pointer 
           shadow-lg shadow-gray-700 hover:shadow-xl hover:shadow-gray-600
           border-1 border-white"
                />

                {/* green dot for online users */}
                {Array.isArray(onlineUsers) && onlineUsers.includes(user?._id) && (
                  <div className="rounded-full bg-green-500 h-3 w-3 absolute left-9 bottom-1 border-1 shadow-md shadow-gray-700">
                  </div>
                )}

                <div className="flex flex-col gap-0 py-2">
                  <h2 className="text-lg font-semibold text-black">
                    {user?.name}
                  </h2>
                  <p className="text-sm text-gray-900">{user?.bio}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-2/3">
            <p className="text-gray-700">No users found</p>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="fixed bottom-5 left-5 bg-[#20c7ff] rounded-full flex items-center justify-center ">
        <button
          onClick={handleLogOut}
          className="flex items-center gap-2 p-2 text-black hover:text-red-600 transition-colors duration-200 hover:cursor-pointer"
        >
          <BiLogOutCircle className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;