import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import { useAddchapterMutation } from '../../../api/chefApiSlice';
import { auth } from '../../../context/authReducer';
import { useSelector } from 'react-redux';
import Vedio from '../../vedio';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadLottie from '../../../components/Lottie/UploadLottie';
import ChefNavbar from '../../../components/Navbar/ChefNavbar';
import ProgressBar from 'react-progress-bar-plus';

function AddChapter() {
    const [openlottie,setOpenlottie]=useState(false)
  const [addchapter] = useAddchapterMutation()
  const [prevToastId, setPrevToastId] = useState(null);
  const user = useSelector(auth)
  const usenavigate=useNavigate()

  const location=useLocation()
  const course_id=location.state?.id

    const formik = useFormik({
        initialValues: {
          chapterNo:'',
          title: '',
          description: '',
          coverImage: null,
          demoVideo: null,
        },
        validationSchema: Yup.object({
          title: Yup.string().required('Title is required').max(20, 'Title must be at most 20 words'),
          description: Yup.string().required('Description is required'),
          coverImage: Yup.mixed().required('Cover Image is required'),
          demoVideo: Yup.mixed().required('Demo Video is required'),
          chapterNo: Yup.number().required('chapterNo is required').positive('chapterNo must be positive').max(100,'maximum 100 chapters'),
        }),
        onSubmit: (values) => {
          handleaddcourseSubmit(values)
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

      const handleaddcourseSubmit = async (values) => {
        // e.preventDefault();
        console.log(values);

    
        try {
          setOpenlottie(true)
          const formData = new FormData();
          formData.append("formdata", JSON.stringify(values));
          formData.append("coverImage", values.coverImage);
          formData.append("demoVideo", values.demoVideo);
          formData.append("id", course_id);
          
          console.log("DemoVideo size:", values.demoVideo.size);
          
          await addchapter(formData).then((response) => {
            if(response.error){
              // console.log(response.error.data.message);
              setOpenlottie(false)
              showToast(response.error.data.message);
            }else{
              toast.success(response.data.message);
              usenavigate(-1)
            }
          })
          
          // Reset the form if needed
          // e.target.reset();
        } catch (error) {
          console.log(error);
          if (error.response) {
            console.log(error.response);
            // showToast(error.response.data.message);
          } else if (error.request) {
            console.log(error.resqust);
            // showToast(error.message);
          } else {
            console.log(error.message);
            // showToast(error.message);
          }
        }
      };

      
  return (
    <>
    <ChefNavbar/>
    <Toaster/>
    {openlottie ? 
    <>
      <UploadLottie/>
      <ProgressBar percent={0} autoIncrement />
    </>
      :  
    <form
    onSubmit={formik.handleSubmit}
    encType="multipart/form-data" 
    className="max-w-lg mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md"
  >
    <h2 className="text-2xl flex justify-center font-bold mb-4">Add Chapter</h2>

    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-medium text-gray-600">
      Title
      </label>
      <input
        id="title"
        name="title"
        type='text'
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
      <label htmlFor="description" className="block text-sm font-medium text-gray-600">
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
        <div className="text-red-500 text-sm">{formik.errors.description}</div>
      ) : null}
    </div>


    <div className="mb-4">
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-600">
          Cover Image
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="file"
          accept="image/*"
          onChange={(event) => formik.setFieldValue('coverImage', event.currentTarget.files[0])}
          onBlur={formik.handleBlur}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.touched.coverImage && formik.errors.coverImage ? (
          <div className="text-red-500 text-sm">{formik.errors.coverImage}</div>
        ) : null}
      </div>


      <div className="mb-4">
        <label htmlFor="demoVideo" className="block text-sm font-medium text-gray-600">
          Video
        </label>
        <input
          id="demoVideo"
          name="demoVideo"
          type="file"
          accept="video/*"
          onChange={(event) => formik.setFieldValue('demoVideo', event.currentTarget.files[0])}
          onBlur={formik.handleBlur}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        />
        {formik.touched.demoVideo && formik.errors.demoVideo ? (
          <div className="text-red-500 text-sm">{formik.errors.demoVideo}</div>
        ) : null}
      </div>

      <div className="mb-4">
  <label htmlFor="chapterNo" className="block text-sm font-medium text-gray-600">
  ChapterNo
  </label>
  <input
    id="chapterNo"
    name="chapterNo"
    type="number"  // Set the type to "number"
    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.chapterNo}
  />
  {formik.touched.chapterNo && formik.errors.chapterNo ? (
    <div className="text-red-500 text-sm">{formik.errors.chapterNo}</div>
  ) : null}
</div>


     

    {/* ... Repeat similar structure for other fields ... */}

    <button
      type="submit"
      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200"
    >
      Add Chapter
    </button>
  </form>
  }
  </>
  )
}

export default AddChapter
