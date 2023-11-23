import React, { useEffect, useState } from 'react'
import { useGetFullCoursesMutation } from '../../../api/publicApiSlice';
import AdminNavbar from '../../../components/Navbar/AdminNavbar';

function AdminAllCourses() {
    const [courses,setCourses]=useState([])
    const [getfullcourse]=useGetFullCoursesMutation()
    useEffect(() => {
        const fetccourses = async () => {
          try {
            const response = await getfullcourse();
            setCourses(response.data.courses);
            console.log(response.data.courses);
          } catch (error) {
            console.error("Error fetching chefs:", error);
          }
        };
        fetccourses();
      }, []);
  return (
    <div>
     
     <AdminNavbar/>
        <div className="text-center mt-8 mb-8 hvr-wobble-bottom w-full">
          <h2 className="text-3xl font-bold text-black-600">ALL COURSES</h2>
          
        </div>
        <div className="flex justify-center sm:justify-start gap-7 sm:ms-16   flex-wrap mt-8">
        {courses.map((video, index) => (
            <div
              key={video.id}
              className="video-card w-72 bg-gray-200 mx-2 rounded-md my-4 overflow-hidden hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105 "
            >
              <img
                src={video.coverImage?.url}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <div className='justify-between flex'>
                {/* <p>{video.blurb}</p> */}
          </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default AdminAllCourses
