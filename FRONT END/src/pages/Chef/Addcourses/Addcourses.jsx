import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useAddcourseMutation } from "../../../api/chefApiSlice";
import { auth } from "../../../context/authReducer";
import { useSelector } from "react-redux";
import Vedio from "../../vedio";
import { useNavigate } from "react-router-dom";
// import UploadLottie from "../../../components/Lottie/UploadLottie";
import ChefNavbar from "../../../components/Navbar/ChefNavbar";
import ProgressBar from "react-progress-bar-plus";
import "react-progress-bar-plus/lib/progress-bar.css";
import { useGetAllCategorysMutation } from "../../../api/publicApiSlice";

function Addcourses() {
  const [openlottie, setOpenlottie] = useState(false);
  const [addcourse] = useAddcourseMutation();
  const [prevToastId, setPrevToastId] = useState(null);
  const [categories, setCategories] = useState([]);
  const user = useSelector(auth);
  const usenavigate = useNavigate();
  const [getCatogerys] = useGetAllCategorysMutation();

  useEffect(() => {
    const fetchCatogery = async () => {
      try {
        const response = await getCatogerys();
        setCategories(response?.data?.categories);
        // console.log('hello');
        // console.log(response.data.categories);
      } catch (error) {
        // Handle errors, if necessary
      }
    };

    fetchCatogery();
  }, []);

  const formik = useFormik({
    initialValues: {
      aboutChef: "",
      blurb: "",
      title: "",
      description: "",
      coverImage: null,
      price: "",
      demoVideo: null,
      category: "",
    },
    validationSchema: Yup.object({
      aboutChef: Yup.string().required("About Chef is required"),
      blurb: Yup.string().required("Blurb is required"),
      title: Yup.string()
        .required("Title is required")
        .max(20, "Title must be at most 20 words"),
      description: Yup.string().required("Description is required"),
      coverImage: Yup.mixed().required("Cover Image is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      demoVideo: Yup.mixed().required("Demo Video is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      handleaddcourseSubmit(values);
      console.log(values);
    },
  });

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

  const handleaddcourseSubmit = (values) => {
    // e.preventDefault();
    console.log("hello");
    console.log("hello", values);

    try {
      // setOpenlottie(true);
      const formData = new FormData();
      formData.append("formdata", JSON.stringify(values));
      formData.append("coverImage", values.coverImage);
      formData.append("demoVideo", values.demoVideo);
      formData.append("user", JSON.stringify(user));

      console.log("DemoVideo size:", values.demoVideo.size);

      addcourse(formData)
        .then((response) => {
          toast.success(response.data.message);
          // setOpenlottie(true);
          usenavigate("/chef");
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

  return (
    <>
      <ChefNavbar />
      {openlottie ? (
        <>
          {/* <UploadLottie /> */}
          <ProgressBar percent={0} autoIncrement />
        </>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="text-2xl flex justify-center font-bold mb-4">
            Add Course
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
              htmlFor="coverImage"
              className="block text-sm font-medium text-gray-600"
            >
              Cover Image
            </label>
            <input
              id="coverImage"
              name="coverImage"
              type="file"
              accept="image/*"
              onChange={(event) =>
                formik.setFieldValue("coverImage", event.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {formik.touched.coverImage && formik.errors.coverImage ? (
              <div className="text-red-500 text-sm">
                {formik.errors.coverImage}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <label
              htmlFor="demoVideo"
              className="block text-sm font-medium text-gray-600"
            >
              Demo Video
            </label>
            <input
              id="demoVideo"
              name="demoVideo"
              type="file"
              accept="video/*"
              onChange={(event) =>
                formik.setFieldValue("demoVideo", event.currentTarget.files[0])
              }
              onBlur={formik.handleBlur}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
            {formik.touched.demoVideo && formik.errors.demoVideo ? (
              <div className="text-red-500 text-sm">
                {formik.errors.demoVideo}
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
            Add Course
          </button>
        </form>
      )}
    </>
  );
}

export default Addcourses;
