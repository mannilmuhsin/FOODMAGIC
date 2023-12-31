import {
  faArrowRight,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useChefsCoursMutation,
  useHandleShowCourseMutation,
} from "../../../api/chefApiSlice";
import ChefNavbar from "../../../components/Navbar/ChefNavbar";
import { auth } from "../../../context/authReducer";
import { BiSearchAlt } from "react-icons/bi";

function Mycoureses() {
  const usenavigate = useNavigate();
  const [chefCourses] = useChefsCoursMutation();
  const [handleShowCourses] = useHandleShowCourseMutation();
  const [listAllClicked, setListAllClicked] = useState(true);
  const [unlistAllClicked, setUnlistAllClicked] = useState(false);
  const user = useSelector(auth);

  const [videos, setVodeos] = useState([]);
  const [list, setList] = useState([]);

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const searchedCourses = list.filter((course) =>
  course.title.toLowerCase().includes(searchTerm.toLowerCase())
);
const indexOfLastCourse = currentPage * itemsPerPage;
const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
const currentCourses = searchedCourses.slice(
  indexOfFirstCourse,
  indexOfLastCourse
);

const pageNumbers = [];
for (let i = 1; i <= Math.ceil(searchedCourses.length / itemsPerPage); i++) {
  pageNumbers.push(i);
}

const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleshowcourses = async (id) => {
    try {
      const changedResponse = await handleShowCourses({ id });
      toast.success(changedResponse.data.message);

      const response = await chefCourses(user.user);
      if (listAllClicked) {
        const trueCourses = response.data.courses.filter(
          (course) => course.isShow === true
        );
        setList(trueCourses);
      } else {
        const trueCourses = response.data.courses.filter(
          (course) => course.isShow === false
        );
        setList(trueCourses);
      }
      setVodeos(response.data.courses);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchChefCourses = async () => {
      try {
        const response = await chefCourses(user.user);
        const trueCourses = response.data.courses.filter(
          (course) => course.isShow === true
        );
        setList(trueCourses);
        setVodeos(response.data.courses);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchChefCourses();
  }, []);
  const handleListAll = async () => {
    setListAllClicked(true);
    setUnlistAllClicked(false);
    const trueCourses = videos.filter((course) => course.isShow === true);
    setList(trueCourses);
    setCurrentPage(1)
  };

  const handleUnlistAll = async () => {
    setUnlistAllClicked(true);
    setListAllClicked(false);
    const falseCourses = videos.filter((course) => course.isShow === false);
    setList(falseCourses);
    setCurrentPage(1)
  };

  return (
    <div>
      <ChefNavbar />
      <Toaster />
      <div className="flex h-12 justify-start ms-3 sm:ms-20 gap-4 mt-4">
        <button
          onClick={handleListAll}
          className={`btn ${
            listAllClicked
              ? "!bg-red-700 text-white shadow-lg shadow-red-950 scale-110 "
              : "!bg-slate-600 border-black border"
          } text-black  px-4 py-2 transition duration-300 ease-in-out`}
        >
          Listed
        </button>
        <button
          onClick={handleUnlistAll}
          className={`btn ${
            unlistAllClicked
              ? "!bg-red-700 text-white shadow-lg shadow-red-950 scale-110"
              : "!bg-slate-600 border-black border "
          } text-black  px-4 py-2 transition duration-300 ease-in-out`}
        >
          Unlisted
        </button>
        <div className="bg-[#e4f7f1] border h-14 me-8 w-full md:p-4 p-2 mb-2  shadow-lg rounded-lg flex justify-between sm:me-10 m-0">
            <input
              className="bg-[#e4f7f1] placeholder-gray-400 w-full text-sm outline-none focus:outline-none"
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ color: "black" }}
            />
            <BiSearchAlt size={30} />
          </div>
      </div>
      <div className="text-center mt-8 mb-8 hvr-wobble-bottom w-full">
        <h2 className="text-3xl font-bold text-black-600">MY COURSES</h2>
      </div>
      {/* <div className="flex justify-center  gap-7    flex-wrap mt-8">
        {currentCourses.map((video, index) => (
          <div
            key={video.id}
            className="video-card w-72 bg-gray-200 mx-2 rounded-md my-4 overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 "
          > */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-3 sm:p-8  ">
             {currentCourses.map((video, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-md overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105"
            >
            <img
              src={video.coverImage?.url}
              alt={video.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{video.title}</h3>
              <div className="justify-between flex">
                <button
                  onClick={() =>
                    usenavigate("/chef/videos", { state: { id: video._id } })
                  }
                  className={`btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black !text-black hover:!text-white  bg-indigo-500 px-4 py-2 hover:bg-indigo-700 transition duration-300 ease-in-out`}
                >
                  Continue
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
                <button
                  onClick={() => handleshowcourses(video._id)}
                  className={`${
                    video.isShow
                      ? "text-red-600 hover:text-white"
                      : "text-green-500 hover:text-green-700"
                  }btn hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black bg-indigo-500 px-7 py-2 hover:bg-indigo-700 transition duration-300 ease-in-out`}
                >
                  {video.isShow ? (
                    <>
                      <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                      Hide
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      Show
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`mx-2 px-3 py-1 rounded-md ${
              number === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Mycoureses;
