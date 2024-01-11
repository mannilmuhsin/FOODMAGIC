import {
  faEdit,
  faEye,
  faEyeSlash,
  faPlusCircle,
  faStar,
  faTools,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteCoursMutation,
  useGetCoursMutation,
  useHandleShowCourseMutation,
  useDeleteChapterMutation,
} from "../../../api/chefApiSlice";
import ChefNavbar from "../../../components/Navbar/ChefNavbar";
import EditCourse from "../../../components/EditCourse/EditCourse";

function ChefVideos() {

  const [video, setVodeo] = useState({});
  







  const usenavigate = useNavigate();
  const [getcourse] = useGetCoursMutation();
  const [handleShowCourses] = useHandleShowCourseMutation();
  const [deleteCourse] = useDeleteCoursMutation();
  const [deletechapter] = useDeleteChapterMutation();
  const [isEditorOpen,setIsEditorOpen] = useState(false)

  const location = useLocation();
  const course_id = location.state?.id;


  useEffect(() => {
    const fetchChefCourse = async () => {
      try {
        const response = await getcourse(course_id);
        setVodeo(response.data.course);
        // console.log(response.data.course);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchChefCourse();
  }, []);


  const handleshowcourses = async (id) => {
    try {
      const changedResponse = await handleShowCourses({ id });
      toast.success(changedResponse.data.message);

      const response = await getcourse(course_id);
      setVodeo(response.data.course);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteCourses = async (id) => {
    try {
      const changedResponse = await deleteCourse(id);
      toast.success(changedResponse.data.message);
      usenavigate("/chef/mycourses");

      const response = await getcourse(course_id);
      setVodeo(response.data.course);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteChapter = async (id, index) => {
    try {
      const changedResponse = await deletechapter({ id, index });
      toast.success(changedResponse.data.message);

      const response = await getcourse(course_id);
      setVodeo(response.data.course);
      // usenavigate("/chef/videos");
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="md:h-screen md:overflow-hidden">
      <ChefNavbar />
      <Toaster />

      <div className="flex flex-col   md:flex-row">
        <div className="w-full md:w-2/3 p-4  mb-4 md:mb-0 md:sticky md:top-0 md:overflow-hidden  ">
          <div className="max-w-screen-xl mt-2 mx-auto bg-white  md:overflow-y-auto md:h-screen rounded-lg">
            <div className="text-center   pt-4 mb-4">
              <h2 className="text-lg font-bold text-black-600">
                COURSES DETAILSE
              </h2>
            </div>
            {/* ... (your existing right card content) */}
            <div className="max-w-screen-xl mx-auto p-8 pt-0  bg-white ">
              {/* Video Frame */}
              <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">VIDEO</h1>
              </div>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <video
                  src={video.demoVideo?.url}
                  className="w-5/6 h-96 object-cover rounded-md"
                  poster={video.coverImage?.url}
                  controls
                />
              </div>
              {/* Cover Image */}
              {/* <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">COVER IMAGE</h1>
              </div> */}
              {/* <img
                src={video.coverImage?.url}
                alt="Video Cover"
                className="w-96 h-72 object-cover rounded-md mb-4"
              /> */}

              {/* Title */}
              <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">TITLE</h1>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {video.title}
              </h2>

              {/* Blurb */}
              <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">BLURB</h1>
              </div>
              <p className="text-gray-600 mb-2">{video.blurb}</p>

              {/* Description */}
              <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">DESCRIPTION</h1>
              </div>
              <p className="text-gray-600 mb-4">{video.description}</p>

              {/* Price */}
              <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">PRICE</h1>
              </div>
              <p className="text-lg font-bold text-green-500 mb-2">
                ${video.price}
              </p>

              {/* Category */}
              <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">CATEGORY</h1>
              </div>
              <p className="text-gray-600 mb-4">Category: {video.category}</p>

              {/* About Chef */}
              <div className="flex">
                <FontAwesomeIcon icon={faStar} className="mt-1 text-xs" />
                <h1 className="font-roboto mb-3 ms-3">ABOUT CHEF</h1>
              </div>
              <div className="mb-4">
                {/* <h3 className="text-xl font-bold text-gray-800 mb-2">About the Chef</h3> */}
                <p className="text-gray-600">{video.aboutChef}</p>
              </div>

              {/* Buttons Section */}
              <div className="flex items-center justify-between border-y-2 py-4">
                {/* Delete Button */}
                <button
                  onClick={() => deleteCourses(video._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                  Delete
                </button>

                {/* Hide Button */}
                <button
                  onClick={() => handleshowcourses(video._id)}
                  className={`${
                    video.isShow
                      ? "text-yellow-500 hover:text-yellow-700"
                      : "text-green-500 hover:text-green-700"
                  }`}
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

                {/* More Button (Ellipsis) */}
                <button className="text-blue-500 hover:text-blue-700" onClick={()=>setIsEditorOpen(true)}>
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() =>
                    usenavigate("/chef/addchapter", {
                      state: { id: video._id },
                    })
                  }
                  className="btn btn-primary border hvr-float-shadow bg-slate-500  hover:bg-purple-700 transition duration-300 ease-in-out py-2 px-6 text-lg"
                >
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                  Upload New Chapter
                </button>
              </div>
            </div>
            <div className="h-16 hidden md:block bg-slate-600"></div>
          </div>
        </div>

        {/* Right Card */}
        {/* <div className="w-full md:w-1/3 p-4 md:ml-4 mt-4 md:mt-0"> */}
        {/* <div className="sticky top-0"> */}
        {/* <div className="max-w-screen-xl mx-auto bg-white rounded-md shadow-lg"> */}
        <div className="w-full md:w-1/3 p-4 mb-4 md:mb-0 md:sticky md:top-0 md:overflow-hidden  ">
          <div className="max-w-screen-xl mt-2 mx-auto bg-white rounded-md  md:overflow-y-auto md:h-screen ">
            <div className="text-center   pt-4 mb-4">
              <h2 className="text-lg font-bold text-black-600">CHAPTERS</h2>
            </div>

            {/* Card Section */}
            {video?.chapters?.map((chapter, i) => (
              <div className="max-w-2xl mx-auto  border-y bg-blue-50 p-8 mb-8">
                {/* ... (your existing left card content) */}
                <div className="mb-4">
                  <img
                    src={chapter.coverImage.url}
                    alt="Course Cover"
                    className="w-full h-64 object-cover rounded-md"
                  />
                </div>

                {/* Video Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {chapter.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4">{chapter.description}</p>

                {/* Buttons Section */}
                <div className="flex items-center justify-between border-t-2 pt-4">
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteChapter(video._id, chapter.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                    Delete
                  </button>

                  {/* Hide Button */}
                  <button className="text-yellow-500 hover:text-yellow-700">
                    <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                    Hide
                  </button>

                  {/* More Button (Ellipsis) */}
                  <button
                    onClick={() =>
                      usenavigate("/chef/videodetailes", {
                        state: { video: chapter },
                      })
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FontAwesomeIcon icon={faTools} />
                  </button>
                </div>
              </div>
            ))}

            <div className="h-12 hidden  bg-slate-600 justify-center md:flex items-center">
              {video?.chapters?.length == 0 && (
                <p className=" text-white">Please add chapters !</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {isEditorOpen && (
          <>
           <EditCourse video={video}/>
          </>
         )}
    </div>
  );
}

export default ChefVideos;
