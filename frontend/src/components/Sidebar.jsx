import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { userData } = useSelector((state) => state.user);
  const [search, setSearch] = useState(false);

  // console.log("userData", userData);
  return (
    <div className="lg:w-1/3 w-full h-full">
      <div className="w-full h-1/3 bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to--[#20c7ff] py-1 flex items-center justify-center gap-3 text-black">
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
              @{userData.username}
            </a>
          </div>

          <a href="/profile">
            <img
              src={userData?.image}
              alt="Profile"
              className="w-14 h-14 rounded-full shadow-lg shadow-gray-700 cursor-pointer"
            />
          </a>
        </div>

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


          

          <div>Online Users</div>
        </div>
      </div>

      <div>chat</div>
    </div>
  );
};

export default Sidebar;

// {
//   !search && (
//     <div
//       className=" rounded-full cursor-pointer overflow-hidden bg-white p-2 shadow-lg shadow-gray-400"
//       onClick={() => setSearch(true)}
//     >
//       <IoSearchOutline className="text-2xl" />
//     </div>
//   );
// }

// {
//   search && (
//     <form className="flex items-center justify-start pl-3 gap-1 w-4/6 bg-white rounded-full py-1 shadow-lg shadow-gray-400 h-9">
//       <IoSearchOutline className="text-2xl" />
//       <input
//         type="text"
//         placeholder="Search User"
//         className=" h-full bg-transparent outline-none"
//       />
//       <RxCross2
//         className="text-xl cursor-pointer"
//         onClick={() => setSearch(false)}
//       />
//     </form>
//   );
// }
