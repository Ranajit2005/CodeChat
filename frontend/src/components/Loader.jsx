import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-2" />
        <p className="text-white font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;