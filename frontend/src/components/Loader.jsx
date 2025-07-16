import { FaSpinner } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <FaSpinner className="text-blue-700 text-4xl animate-spin" />
    </div>
  );
};

export default Loader;
