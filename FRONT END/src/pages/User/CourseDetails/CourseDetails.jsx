import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import { useGetCourseByIdMutation } from "../../../api/publicApiSlice";
import { useMakePaymentMutation } from "../../../api/userApiSlice";
import Navbar from "../../../components/Navbar/Navbar";
import { auth } from "../../../context/authReducer";
import { Rating } from "@mui/material";

const CourseDetails = () => {
  const [getcourse] = useGetCourseByIdMutation();
  const location = useLocation();
  const course_id = location.state?.id;
  const [video, setVodeo] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [makePaymentApi] = useMakePaymentMutation();
  const navigate = useNavigate();
  const user = useSelector(auth);

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
    const fetchCourse = async () => {
      try {
        const response = await getcourse(course_id);
        console.log(response.data.course);
        setVodeo(response.data.course);
        const reversedReviews = [...response.data?.course?.reviews].reverse();
        setReviews(reversedReviews);
        if(reversedReviews.length){
          const sumOfRatings = reversedReviews?.reduce(
            (accumulator, currentValue) => accumulator + currentValue.rating,
            0
          );
          setTotalRating(reversedReviews.length);
          setAverageRating(parseFloat((sumOfRatings / reversedReviews.length).toFixed(1)));

        }
      } catch (error) {
        console.error("Error ", error);
      }
    };

    fetchCourse();
  }, []);

  const makePayment = async () => {
    if (!user.user) {
      return navigate("/login", { state: { from: location } });
    }
    const stripe = await loadStripe(
      "pk_test_51OISQWSBQLVhDmRfAhLKSBBKcyKeeIUvfUe1urrofu6ZeWJqqY5N6pVwJ7ItTIVpPSm1kAAWuuR5WJmQMfFUCn6800Wi7hSBjG"
    );

    const response = await makePaymentApi({ video, user });
    console.log(response);

    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (result.error) {
      console.error(result.error);
      // Handle the error, e.g., show an error message to the user
    } else {
      // The redirection was successful
      console.log("Redirection successful");
    }
  };

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
              MASTER CHEF : {video?.chef?.username}
            </h2>
            <p>{video.aboutChef}</p>
          </div>
          <div className="mb-4  border shadow-md rounded-md bg-blue-50 p-8">
            <h2 className="lg:text-2xl text-xl uppercase  mb-4 font-bold">
              Course Description
            </h2>
            <p>{video.description}</p>
          </div>

          <div className="max-w-xl  p-6 bg-white rounded-md shadow-md text-center">
            <h2 className="text-xl mb-4">Total Rating</h2>

            {/* Average Rating (Visual Representation) */}
            <div className="flex items-center justify-center mb-4">
              <Rating name="read-only" value={averageRating} readOnly />
            </div>

            {/* Average Rating (Numerical Value) */}
            <p className="text-xl font-bold mb-2">{averageRating}</p>

            {/* Number of Reviews */}
            <p className="text-gray-500">Based on {totalRating} reviews</p>
          </div>

          <div className="max-w-xl my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl mb-6 text-center">Product Reviews</h2>

            {/* Single Review Card (Sample) */}
            {reviews.map((review) => (
              <div className="border-b pb-4 mb-4">
                {/* Username and Date */}
                <div className="flex justify-between mb-2">
                  <span className="font-bold">{review.user}</span>
                  <span className="text-sm text-gray-500">
                    {review.date?.slice(0, 10)}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="mb-2">
                  <Rating name="read-only" value={review.rating} readOnly />
                  <span className="ml-2 text-md text-gray-500">
                    {review.rating}.0
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-4">{review.review}</p>
              </div>
            ))}

            {/* Add more review cards as needed... */}
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
              <button
                onClick={makePayment}
                className="btn me-8 hvr-shutter-in-horizontal justify-center border-y rounded-md border-black !text-black  px-4 py-2 hover:bg-indigo-800 transition duration-300 ease-in-out"
              >
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
