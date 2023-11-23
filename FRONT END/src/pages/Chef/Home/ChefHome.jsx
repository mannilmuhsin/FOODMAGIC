import React, { useEffect, useState } from "react";
import ChefNavbar from "../../../components/Navbar/ChefNavbar";
import { auth } from "../../../context/authReducer";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBook,
  faIndianRupee,
  faArrowRight,
  faVideo,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import "hover.css/css/hover-min.css";
import "./Chef.css";
import { useNavigate } from "react-router-dom";
import { useChefsCoursMutation } from "../../../api/chefApiSlice";

function ChefHome() {
  const usenavigate = useNavigate();

  // Placeholder data
  const totalStudents = 150;
  const [totalCourses,setToatalCourses] = useState(0);
  const totalRevenue = "$50,000";

  const [chefCourses]=useChefsCoursMutation()
  const user = useSelector(auth);

  // Placeholder videos data
  const [videos,setVodeos]=useState([])
  useEffect(() => {
    const fetchChefCourses = async () => {
      try {
        const response = await chefCourses(user.user)
        // console.log(response.data.courses);
        setVodeos(response.data.courses.slice(0,4))
        setToatalCourses(response.data.courses.length)
      } catch (error) {
        console.error("Error fetching Unsplash images", error);
      }
    };

    fetchChefCourses();
  }, []);

  return (
    <div>
      <ChefNavbar />

      <div className=" p-8">
        {/* Top Level Welcome */}
        <div className="text-center rounded bg-gradient-to-r from-blue-950 to-gray-950 text-white p-8">
          <h1 className="sm:text-5xl text-4xl font-bold mb-4 text-yellow-500">
            HELLO {user.user}
          </h1>
          <p className="text-lg sm:text-2xl mb-4">
            Welcome to Your Chef Dashboard
          </p>
          <p className="text-lg sm:text-2xl mb-4">
            Congratulations! You've Got Some Exciting News
          </p>
        </div>

        {/* Cards - Total Students, Total Courses, Total Revenue */}
        <div className="flex flex-col md:flex-row justify-around my-8">
          {/* Total Students Card */}
          <div className="hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-110 text-center bg-blue-600 text-white p-6 rounded-md shadow-lg mb-4 md:mb-0 hover:shadow-red-500">
            <FontAwesomeIcon icon={faUsers} size="3x" className="mt-4" />
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Total Students
            </h2>
            <p className="text-lg md:text-xl">{totalStudents}</p>
          </div>

          {/* Total Courses Card */}
          <div onClick={()=>usenavigate('/chef/mycourses')} className="hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-110 text-center bg-purple-600 text-white p-6 rounded-md shadow-lg mb-4 md:mb-0 hover:shadow-red-500">
            <FontAwesomeIcon icon={faBook} size="3x" className="mt-4" />
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Total Courses
            </h2>
            <p className="text-lg md:text-xl">{totalCourses}</p>
          </div>

          {/* Total Revenue Card */}
          <div className="hover:bg-green-700  transition duration-300 ease-in-out transform hover:scale-110 text-center bg-green-600 text-white p-6 rounded-md shadow-lg hover:shadow-red-500 ">
            <FontAwesomeIcon icon={faIndianRupee} size="3x" className="mt-4" />
            <h2 className="text-xl md:text-3xl font-bold mb-2">
              Total Revenue
            </h2>
            <p className="text-lg md:text-xl">{totalRevenue}</p>
          </div>
        </div>

        {/* Videos Section */}
        <div className="text-center mt-14 mb-8 hvr-wobble-bottom w-full">
          <h2 className="text-3xl font-bold text-black-600">RECENT UPLOADS</h2>
        </div>

        {/* Video Cards */}
        <div className="flex justify-center sm:justify-start gap-7   flex-wrap mt-8">
          {videos.map((video, index) => (
            <div
              key={video._id}
              className="video-card w-72 bg-gray-200 mx-2 rounded-md my-4 overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 "
            >
              <img
                src={video.coverImage?.url}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <button onClick={()=>usenavigate('/chef/videos',{state:{id:video._id}})} className="btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black bg-indigo-500 px-4 py-2 hover:bg-indigo-700 transition duration-300 ease-in-out">
                  Continue
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add More Videos Option */}
        <div className="text-center my-12 bg-gradient-to-r from-purple-800 to-indigo-800 text-white p-12 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold mb-4">
            Expand Your Culinary Journey
          </h2>
          <p className="text-lg mb-6">
            Discover new horizons and share your expertise with the world.
          </p>
          <button
            onClick={() => usenavigate("/chef/addcourse")}
            className="btn btn-primary border hvr-float-shadow  hover:bg-purple-700 transition duration-300 ease-in-out py-2 px-6 text-lg"
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Upload New Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChefHome;
