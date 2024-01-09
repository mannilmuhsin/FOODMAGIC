import React, { useEffect, useState } from "react";
import { FiEdit, FiEdit2 } from "react-icons/fi";
import Navbar from "../../../components/Navbar/Navbar";
import { auth } from "../../../context/authReducer";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  useProfileMutation,
  useUpdateProimageMutation,
} from "../../../api/userApiSlice";
import ChangePasswordModal from "../../../components/Modal/ChangePasswordModal";
import UpdateProfileModal from "../../../components/Modal/UpdateProfileModal";
import ChefNavbar from "../../../components/Navbar/ChefNavbar";
import AdminNavbar from "../../../components/Navbar/AdminNavbar";
import { useLocation, useNavigate } from "react-router-dom";

function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const [proimage, setProimage] = useState("");
  const [updateModal, setupdateModal] = useState(false);
  const [userPro, setuserPro] = useState({});
  const [profile] = useProfileMutation();
  const [updateproimage] = useUpdateProimageMutation();
  const user = useSelector(auth);
  const navigate = useNavigate()
  const location = useLocation();

  const handleProimageChange = (e) => {
    setProimage(e.target.files[0]);
  };
  const showToast = (message) => {
    if (prevToastId) {
      toast.dismiss(prevToastId);
    }

    const newToastId = toast.error(message, {
      duration: 3000,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        width: "300px",
      },
    });
    setPrevToastId(newToastId);
  };

  const handleProimageSubmit = async (e) => {
    e.preventDefault();

    if (!proimage) {
      console.error("Please select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("proimage", proimage);
      formData.append("user", JSON.stringify(user));

      await updateproimage(formData).then((response) => {
        toast.success(response.data.message);
        setProimage("");
      });

      // Reset the form if needed
      // e.target.reset();
    } catch (error) {
      if (error.response) {
        showToast(error.response.data.message);
      } else if (error.request) {
        showToast(error.message);
      } else {
        showToast(error);
      }
    }
  };

  useEffect(() => {
    if (!user.user) {
      navigate("/login", { state: { from: location } });
    }
    const fetchUserProfile = async () => {
      try {
        const response = await profile(user);
        setuserPro(response.data.userdetailes);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, [user,proimage]);

  return (
    <>
      {openModal ? <ChangePasswordModal setOpenModal={setOpenModal} /> : null}
      {updateModal ? (
        <UpdateProfileModal
          setupdateModal={setupdateModal}
          preusername={userPro.username}
          prephone={userPro.phone}
        />
      ) : null}
      {user.role == 2000 ?
      <Navbar />
      :
      user.role == 3000?
      <ChefNavbar/>
      :
      <AdminNavbar/>
      }
      <Toaster />

      <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">
        <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
          <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-blue-200 opacity-75 mx-6 lg:mx-0"
          >
            <div className="p-4 md:p-12 text-center lg:text-left">
              <div
                className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${
                    proimage
                      ? URL.createObjectURL(proimage)
                      : userPro.pic?.url
                      ? userPro.pic.url
                      : "https://source.unsplash.com/MP0IUfwrn0A"
                  })`,
                }}
              >
                <form
                  encType="multipart/form-data"
                  onSubmit={handleProimageSubmit}
                  className="absolute top-2 right-2"
                >
                  <label className="flex items-center gap-2 relative">
                    <input
                      type="file"
                      accept="image/*"
                      name="proimage"
                      onChange={handleProimageChange}
                      className="hidden"
                    />
                    <FiEdit2 className="text-blue-500 text-2xl hover:text-blue-700" />
                  </label>
                </form>
              </div>
              {/* <div className="flex justify-between -mt-10 mb-8">
                <p className="font-semibold underline capitalize cursor-pointer">
                  My-Courses
                </p>
                <span className="font-semibold underline capitalize cursor-pointer">
                  My-Blogs
                </span>
              </div> */}

              <h1 className="text-3xl font-bold pt-8 lg:pt-0">
                {userPro.username}
              </h1>

              <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
              <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                <svg
                  className="h-4 fill-current text-green-700 pr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21,4H3A2,2 0 0,0 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6A2,2 0 0,0 21,4M21,6L12,11L3,6H21M3,18V8L12,13L21,8V18H3Z" />
                </svg>
                {userPro.email}
              </p>

              <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                <svg
                  className="h-4 fill-current text-green-700 pr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a7.44 7.44 0 0 1 5.3 2.2 7.48 7.48 0 0 1 2.2 5.3c0 4-3.4 7.2-7.5 7.2S2.5 11.5 2.5 7.3 5.9 0 10 0zM10 18c-4.9 0-9-3.9-9-9s4.1-9 9-9 9 3.9 9 9-4.1 9-9 9z"></path>
                  <path d="M10 4.2a4.8 4.8 0 0 0-4.8 4.8c0 2.7 2.2 4.8 4.8 4.8s4.8-2.2 4.8-4.8-2.2-4.8-4.8-4.8zm0 8.6a3.8 3.8 0 0 1-3.8-3.8 3.8 3.8 0 0 1 3.8-3.8 3.8 3.8 0 0 1 3.8 3.8 3.8 3.8 0 0 1-3.8 3.8z"></path>
                </svg>
                Phone: {userPro.phone}
              </p>

              <div className="pt-12 pb-0 mb-0 flex justify-evenly">
                <button
                  className="bg-teal-900 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setOpenModal(true)}
                >
                  Change password
                </button>
                <button
                  onClick={() => setupdateModal(true)}
                  className="bg-teal-900 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                >
                  Edit details
                </button>
              </div>
            </div>
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={handleProimageSubmit}
            className="w-full lg:w-2/5"
          >
            <label className="flex items-center gap-2 relative">
              <input
                type="file"
                accept="image/*"
                name="proimage"
                onChange={handleProimageChange}
                className="hidden"
              />
              <FiEdit className="text-blue-500 text-2xl hover:text-blue-700 hidden lg:block" />
            </label>
            <img
              src={
                proimage
                  ? URL.createObjectURL(proimage)
                  : userPro.pic?.url
                  ? userPro.pic.url
                  : "https://source.unsplash.com/MP0IUfwrn0A"
              }
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              alt="Profile"
            />

            {proimage && (
              <div className=" flex w-auto justify-center items-center gap-8">
                <button
                  onClick={() => setProimage("")}
                  type=""
                  className="bg-red-700 rounded shadow-lg text-white px-4 py-2 mt-4"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 rounded shadow-lg text-white px-4 py-2 mt-4"
                >
                  SAVE
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
