import { MdLockOutline } from "react-icons/md";


const Landing = () => {
  return (
    <div className="lg:w-2/3 w-full h-full hidden sm:block overflow-hidden relative">
      {/* background Image */}
      <div
        className="absolute inset-y-0 right-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/chatImage.jpeg')` }}
      ></div>

      {/* Overlay, for absolute */}
      <div className="absolute w-full z-10 h-full flex flex-col items-center justify-center">
        <div className="backdrop-blur-sm bg-white/15 rounded-[30px] shadow-lg">
          <div className="flex items-center justify-center h-70 w-100 flex-col">
            <img
              src="/chaticon.png"
              className="h-20 w-20 rounded-full"
              alt="Chat Icon"
            />
            <h1 className="text-3xl font-serif text-gray-900 mt-4">
              Welcome to CodeChat
            </h1>
            <p className="font-serif">Select any user to start chat</p>
            <div className="flex items-center justify-center mt-5">
              <MdLockOutline className="text-xl text-gray-700" />
              <h5 className="text-gray-700">end-to-end encrypted</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;