const MessageArea = () => {
  return (
    <div className="lg:w-2/3 w-full h-full hidden sm:block overflow-hidden relative">

      {/* background Image */}
      <div 
        className="absolute inset-y-0 right-0 w-full h-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('/chatImage.jpeg')` }}
      ></div>

      {/* Overlay, for absolute */}
      <div className="absolute w-full z-10 h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-500 to-[#20c7ff] py-3 rounded-b-[30px] flex items-center justify-start gap-3 text-black pl-3">
          <h1 className="text-xl">CodeChat</h1>
        </div>

      


      </div>
    </div>
  );
};

export default MessageArea;
