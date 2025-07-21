import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";


const Loader = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <div className="w-screen flex justify-center items-center">
          <div className="absolute z-60 top-0  bg-red-500 text-white text-center py-2 shadow-md">
            ⚠️ You are offline. Check your internet connection.
          </div>
        </div>
      )}
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <FaSpinner className="text-blue-700 text-4xl animate-spin" />
      </div>
    </>
  );
};

export default Loader;