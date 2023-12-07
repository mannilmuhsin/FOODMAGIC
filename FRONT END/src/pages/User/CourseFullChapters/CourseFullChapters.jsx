// CourseFullChapters.js
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useGetCourseByIdMutation } from "../../../api/publicApiSlice";

const CourseFullChapters = () => {
  const [currentVideo, setCurrentVideo] = useState({});
  const [getCourse] = useGetCourseByIdMutation();
  const [courseTitle, setCourseTitle] = useState("");
  const [chapters, setChapters] = useState([]);
  const location = useLocation();
  const course_id = location?.state?.course_id;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCourse(course_id);
        setCourseTitle(response.data.course.title);
        setChapters(response.data.course.chapters);
        setCurrentVideo(response.data.course.chapters[0]);
      } catch (error) {
        // Handle errors, if necessary
      }
    };
    
    fetchData();
  }, [course_id]);
  const truncatedDescription = currentVideo?.description?.slice(0, 100); // Adjust the character limit

  return (
    <div className="bg-gray-200">
      <Navbar />
      <div className="ms-2 me-2 mt-8 flex flex-col md:flex-row">
        {/* Video Player Section */}
        <div className="w-full md:w-3/4 md:px-12 mb:pr-4">
      <div className="text-center mb-2">
        <h2 className="text-3xl font-bold text-black-600">{courseTitle}</h2>
      </div>
      <div className="bg-white p-4 rounded-md border shadow-md">
        <video
          controls
          src={currentVideo?.demoVideo?.url}
          className="w-full h-[240px] md:h-[480px] object-cover rounded-md mb-4"
          poster={currentVideo?.coverImage?.url}
          autoPlay
          muted
        />

        {/* <ReactPlayer
        url={currentVideo?.demoVideo?.url}
        controls={true}
        width="800px"
        height='450px'
        /> */}

      
        <div className="mt-2">
          <h2 className="text-lg font-semibold">{currentVideo?.title}</h2>
          <p className="text-md">
            {showFullDescription ? currentVideo?.description : truncatedDescription}
            {!showFullDescription && (
             truncatedDescription?.length>=100 && <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleDescription}
              >
                {' '}
                Read More
              </span>
            )}
            {showFullDescription && (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleDescription}
              >
                {' '}
                Read Less
              </span>
            )}
          </p>
        </div>
      </div>
    </div>

        <div className="md:w-1/4 w-full md:p-4">
          <h2 className="text-2xl mt-8 md:mt-0 font-bold mb-4">Full Chapters</h2>
          {chapters.map((chapter, i) => (
            <div
              key={i}
              onClick={() => setCurrentVideo(chapter)}
              className={`w-full  ${
                currentVideo.id === chapter.id
                  ? "bg-blue-200 md:scale-105 shadow-lg"
                  : "bg-white "
              } mt-1 border border-gray-300 cursor-pointer h-24 overflow-hidden rounded p-2 flex flex-row items-center`}
            >
              <video
                poster={chapter.coverImage.url}
                controls
                className="w-1/3 h-full min-w-[110px] rounded-md  mb-4 md:mb-0"
              />
              <div className="md:ms-4 flex-1">
                <h1 className="font-semibold  my-1">{chapter.title}</h1>
                <p className="text-sm text-gray-600 h-12 overflow-hidden  leading-4 mb-2">
                  {chapter.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseFullChapters;
