import { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setUserData } from "../features/userSlice";

const ProfilePage = () => {
  let { userData } = useSelector((state) => state.user);

  const VITE_CLOUDNAME = import.meta.env.VITE_CLOUDNAME;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(userData?.image || "");
  const [publicId, setPublicId] = useState(userData?.publicId || "");
  const [name, setName] = useState(userData?.name || null);
  const [bio, setBio] = useState(userData?.bio);
  const [hasChanges, setHasChanges] = useState(false);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  console.log("User Data:", userData);

  // Check for changes whenever inputs change
  useEffect(() => {
    const isNameChanged = name !== null && name !== userData?.name;
    const isBioChanged = bio !== null && bio !== userData?.bio;
    const isImageChanged = image !== userData?.image;

    setHasChanges(isNameChanged || isBioChanged || isImageChanged);
  }, [name, bio, image, userData]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "codeChat");
    formData.append("cloud_name", VITE_CLOUDNAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${VITE_CLOUDNAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadImage = await res.json();

      setImage(uploadImage.secure_url);
      setPublicId(uploadImage.public_id);
      setLoading(false);

      toast("Image uploaded successfully!", {
        icon: "✅",
        style: {
          background: "#4ade80",
          color: "#fff",
        },
      });

    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  // Save changes
  const handleChangeProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if(name.length > 20){
        setLoading(false);
        return toast("Name should be less than 20 characters", {
          icon: "❌",
          style: {
            background: "#f87171",
            color: "#fff",
          },
        });
      }

      if(bio.length > 35){
        setLoading(false);
        return toast("Bio should be less than 35 characters", {
          icon: "❌",
          style: {
            background: "#f87171",
            color: "#fff",
          },
        });
      }

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/updateProfile`,{
          name: name,
          bio: bio,
          image: image,
          publicId: publicId,
        },
        { withCredentials: true}
      );

      setLoading(false);

      if (res?.data?.success) {
        setHasChanges(false);
        dispatch(setUserData(res?.data?.user));

        toast(res?.data?.message, {
          icon: "✅",
          style: {
            background: "#4ade80",
            color: "#fff",
          },
        });
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);

      toast(error?.response?.data?.message, {
        icon: "❌",
        style: {
          background: "#f87171",
          color: "#fff",
        },
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-indigo-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-indigo-600 p-4 flex items-center justify-center gap-3 text-white">
          <img
            src="/chaticon.png"
            className="h-8 w-8 sm:h-10 sm:w-10"
            alt="Chat Icon"
          />
          <h1 className="text-xl sm:text-2xl font-bold">Profile Settings</h1>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col md:flex-row p-6 gap-8 bg-gradient-to-br from-blue-300 to-purple-300">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <div className="relative mb-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-indigo-100 shadow-lg">
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-2 right-2 bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 transition-all duration-200 shadow-md hover:scale-105"
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

            <p className="text-lg sm:text-xl font-semibold text-gray-800 bg-indigo-50 px-4 py-2 rounded-full">
              @{userData?.username}
            </p>
          </div>

          {/* Profile Details */}
          <div className="w-full md:w-2/3 space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                placeholder={userData?.name}
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                placeholder={userData?.bio}
                required
              />
            </div>

            {/* Action Buttons */}
            {hasChanges && (
              <div className="flex justify-end pt-6">
                <button
                  onClick={handleChangeProfile}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center shadow-md hover:shadow-lg"
                >
                  <MdEdit className="mr-2" />
                  <span className="whitespace-nowrap">Update Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;