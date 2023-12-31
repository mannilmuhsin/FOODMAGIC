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
import { useFormik } from "formik";
import * as Yup from "yup";

function ChefVideos() {

  const [video, setVodeo] = useState({});
  useEffect(() => {
    const fetchChefCourse = async () => {
      try {
        const response = await getcourse(course_id);
        setVodeo(response.data.course);
        console.log(response.data.course);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchChefCourse();
  }, []);



  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: {
      aboutChef: '',
      blurb: "helloo",
      title: '',
      description: "",
      price: video.price,
      category: "",
    },
    validationSchema: Yup.object({
      aboutChef: Yup.string().required("About Chef is required"),
      blurb: Yup.string().required("Blurb is required"),
      title: Yup.string()
        .required("Title is required")
        .max(20, "Title must be at most 20 words"),
      description: Yup.string().required("Description is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      handleeditcourseSubmit(values);
      console.log(values);
    },
  });

  const handleeditcourseSubmit = (values) => {
    // e.preventDefault();

    try {
    


      addcourse(values)
        .then((response) => {
          toast.success(response.data.message);
          // setOpenlottie(true);
          usenavigate("/chef/videos");
        })
        .catch((err) => {
          console.log(err);
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




  const usenavigate = useNavigate();
  const [getcourse] = useGetCoursMutation();
  const [handleShowCourses] = useHandleShowCourseMutation();
  const [deleteCourse] = useDeleteCoursMutation();
  const [deletechapter] = useDeleteChapterMutation();
  const [isEditorOpen,setIsEditorOpen] = useState(false)

  const location = useLocation();
  const course_id = location.state?.id;


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
    <div className="h-screen overflow-hidden">
      <ChefNavbar />
      <Toaster />

      <div className="flex flex-col-reverse   md:flex-row">
        <div className="w-full md:w-2/3 p-4  mb-4 md:mb-0 sticky top-0 overflow-hidden  ">
          <div className="max-w-screen-xl mt-2 mx-auto bg-white  overflow-y-auto h-screen rounded-lg">
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
            <div className="h-16 bg-slate-600"></div>
          </div>
        </div>

        {/* Right Card */}
        {/* <div className="w-full md:w-1/3 p-4 md:ml-4 mt-4 md:mt-0"> */}
        {/* <div className="sticky top-0"> */}
        {/* <div className="max-w-screen-xl mx-auto bg-white rounded-md shadow-lg"> */}
        <div className="w-full md:w-1/3 p-4 mb-4 md:mb-0 sticky top-0 overflow-hidden  ">
          <div className="max-w-screen-xl mt-2 mx-auto bg-white rounded-md  overflow-y-auto h-screen ">
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

            <div className="h-12 bg-slate-600 justify-center flex items-center">
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
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(5px)",
              }}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
              <div className="bg-white p-6 rounded-md shadow-md w-full max-w-screen-lg">
              <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="text-2xl flex justify-center font-bold mt-12 mb-4">
            Edit Course
          </h2>

          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            >
              <option value="" label="Select a category" />
              {categories?.map((category, i) => (
                <option key={i} value={category.title}>
                  {category.title}
                </option>
              ))}
              {/* Add more options as needed */}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500 text-sm">
                {formik.errors.category}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number" // Set the type to "number"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="text-red-500 text-sm">{formik.errors.price}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="aboutChef"
              className="block text-sm font-medium text-gray-600"
            >
              About Chef
            </label>
            <textarea
              id="aboutChef"
              name="aboutChef"
              rows="2"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.aboutChef}
            />
            {formik.touched.aboutChef && formik.errors.aboutChef ? (
              <div className="text-red-500 text-sm">
                {formik.errors.aboutChef}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="blurb"
              className="block text-sm font-medium text-gray-600"
            >
              Blurb
            </label>
            <textarea
              id="blurb"
              name="blurb"
              rows="2"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.blurb}
            />
            {formik.touched.blurb && formik.errors.blurb ? (
              <div className="text-red-500 text-sm">{formik.errors.blurb}</div>
            ) : null}
          </div>

          {/* ... Repeat similar structure for other fields ... */}

          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200"
          >
            Edit Course
          </button>
          <button
            type="button"
            onClick={()=>setIsEditorOpen(false)}
            className="bg-red-500 ms-10 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200"
          >
            Cancel
          </button>
        </form>
                
                {/* <button
                  // onClick={handleEditorClose}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 text-lg focus:outline-none focus:ring focus:border-red-500"
                >
                  Close Editor
                </button> */}
              </div>
            </div>
          </>
         )}
    </div>
  );
}

export default ChefVideos;
