import { useState, useRef } from "react";
import { FaCamera, FaSave } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Loader from "../components/Loader";
// import { useSelector } from 'react-redux';
// import useCurrentUser from '../CustomHooks/useCurrentUser';

const ProfilePage = () => {
  // User data state
  const [user, setUser] = useState({
    username: "johndoe",
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    lastUpdated: "2023-05-15T10:30:00Z",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [fileName, setFileName] = useState("");


  // File input ref
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "women-health-project");
    formData.append("cloud_name", "dixpqopet");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dixpqopet/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadImage = await res.json();

      console.log("uploadImage", uploadImage);

      setImage(uploadImage.secure_url);
      setPublicId(uploadImage.public_id);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  // Save changes
  const handleChangeProfile = (e) => {
    e.preventDefault();
    console.log("detail : ",name,image,publicId,email)
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-indigo-500 py-5 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-indigo-500 p-3 flex gap-3 justify-center text-white text-center">
          <img src="/chaticon.png" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        {/* Profile Content */}
        <div className="p-5">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-32 h-32 mb-4">
              <img
                src={user.image || image}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-[#20c7ff] shadow-gray-400 shadow-lg"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition duration-200 shadow-md"
              >
                <FaCamera className="text-lg" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2> */}
            <p className="text-xl font-semibold text-gray-800">
              @{user.username}
            </p>
          </div>

          {/* Profile Details */}
          <div className="space-y-3">
            {/* name */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => handleChangeProfile}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 flex items-center"
              >
                <MdEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
