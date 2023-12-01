import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Navbar from "../../../components/Navbar/Navbar";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetCoursMutation } from "../../../api/chefApiSlice";
import { useLocation } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';

const CourseDetails = () => {

  const [getcourse]=useGetCoursMutation()
  const location = useLocation();
  const course_id = location.state?.id;
  const [video, setVodeo] = useState([]);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 800 },
  });

  const course = {
    name: "Web Development Masterclass",
    chef: "John Doe",
    aboutChef:
      "Passionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experience.",
    description:
      "Passionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experiencePassionate chef with years of experienceLearn web development from scratch and become a master in no time!",
    lessonsCount: 20,
    price: "$99.99",
    coverImageUrl: "https://via.placeholder.com/1200x600", // Replace with your actual cover image URL
  };

  useEffect(() => {
    const fetchChefCourse = async () => {
      try {
        const response = await getcourse(course_id);
        setVodeo(response.data.course);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchChefCourse();
  }, []);

  const makePayment = async()=>{
    const stripe = await loadStripe('pk_test_51OISQWSBQLVhDmRfAhLKSBBKcyKeeIUvfUe1urrofu6ZeWJqqY5N6pVwJ7ItTIVpPSm1kAAWuuR5WJmQMfFUCn6800Wi7hSBjG');
  }

  return (
    <div className="min-h-screen  bg-white ">
      <Navbar />
      <animated.div
        style={fadeIn}
        className="  flex flex-col lg:flex-row justify-between items-center h-full p-8 "
      >
        <div className="lg:w-2/3 w-full mb-8 lg:pe-16 lg:mb-0">
          <h1 className="text-3xl font-bold mb-8">{video.title}</h1>
          <div className="mb-8 lg:w-5/6  shadow-md rounded-md p-8">
            <h2 className="lg:text-2xl text-xl mb-4 uppercase font-bold">
              MASTER CHEF : {course.chef}
            </h2>
            <p>{video.aboutChef}</p>
          </div>
          <div className="mb-4  border shadow-md rounded-md bg-blue-50 p-8">
            <h2 className="lg:text-2xl text-xl uppercase  mb-4 font-bold">
              Course Description
            </h2>
            <p>{video.description}</p>
          </div>
        </div>
        <div className="lg:w-1/3 flex  justify-center w-full right-0 bottom-12  lg:fixed ">
          <animated.div
            style={fadeIn}
            className=" w-full p-4 bg-blue-50 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <video
              src={video.demoVideo?.url}
              poster={video.coverImage?.url}
              className="w-full h-72 object-cover mb-4 rounded-md"
              controls
            />

            <h2 className="text-2xl font-bold mb-2">{video.title}(DEMO)</h2>
            <p>{`Lectures : ${video?.chapters?.length}`}</p>
            {/* <p>Life Long Validity</p> */}
            <div className="flex items-center px-8  mt-8 justify-between">
              <p>{`Price: ${video.price}`}</p>
              <button className="btn me-8 hvr-shutter-in-horizontal justify-center border-y rounded-md border-black text-black  px-4 py-2 hover:bg-indigo-800 transition duration-300 ease-in-out">
                BUY NOW
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
};

export default CourseDetails;
