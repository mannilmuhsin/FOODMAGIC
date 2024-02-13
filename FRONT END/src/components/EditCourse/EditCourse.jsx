import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useGetAllCategorysMutation } from "../../api/publicApiSlice";
import { useEditcourseMutation } from "../../api/chefApiSlice";
import { useNavigate } from "react-router-dom";

function EditCourse({video,closeModal}) {
  const [categories, setCategories] = useState([]);
  const [prevToastId, setPrevToastId] = useState(null);
  const [getCatogerys] = useGetAllCategorysMutation();
  const [editcourse] = useEditcourseMutation()
  const usenavigate = useNavigate()



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
      aboutChef: video.aboutChef,
      blurb: video.blurb,
      title: video.title,
      description: video.description,
      price: video.price,
      category: video.category,
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
      editcourse({...values,id:video._id})
        .then((response) => {
          toast.success(response.data.message);
          // setOpenlottie(true);
        //   usenavigate("/chef/videos", { state: { id:response.data?.data?._id } });
          closeModal()
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

  // console.log(video);
  return (
    <>
    <Toaster/>
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
                <div className="text-red-500 text-sm">
                  {formik.errors.title}
                </div>
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
                {/* <option value={formik.values.category} label="Select a category" /> */}
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
                <div className="text-red-500 text-sm">
                  {formik.errors.price}
                </div>
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
                <div className="text-red-500 text-sm">
                  {formik.errors.blurb}
                </div>
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
              onClick={() => closeModal()}
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
  );
}

export default EditCourse;
