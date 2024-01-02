// src/components/Blogs.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { auth, selectCurrentUser } from "../../context/authReducer";
import { useGetAllBlogsMutation } from "../../api/userApiSlice";
import TruncatedText from "../../components/TruncatedText";
import ChefNavbar from "../../components/Navbar/ChefNavbar";
import Modal from "../../components/Modal/BlogModal";

function Blogs() {
  const {role} = useSelector(auth)
  const user = useSelector(selectCurrentUser);
  const [getAllBlogs] = useGetAllBlogsMutation();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBlogs();
        setBlogs(response.data.blogs);
      } catch (error) {
        // Handle errors, if necessary
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {role[0] === 3000 ?
      <ChefNavbar/>
      :
      <Navbar />
      }
      <div className="container mx-auto mt-24 relative">
        {/* Header with Full-width Image */}
        <div className="relative border-b-2 border-black pb-8 mb-8">
          <img
            className="w-full h-96 object-cover"
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fs3.amazonaws.com%2Fimg.mynetdiary.com%2Fblog%2Fhow-to-make-healthy-food-kitchen-set-up-ideas.jpeg&f=1&nofb=1&ipt=17807a9bee15a796edb1658ab0c0c6871be66da4f58980503f3f33b9d89f4e77&ipo=images" // Replace with your image URL
            alt="Blog Header"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-8xl font-bold text-black absolute -top-16 bg-gradient-to-b from-white to-transparent border border-white p-4">
              BLOG
            </h1>
          </div>
        </div>

        {/* Previous Blogs */}
        {user && (
          <div className="mb-8 flex justify-center sm:justify-end">
            <Link
              to="/addblog"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add Blog
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {blogs.map((blog, i) => (
           <div key={i} className="bg-white p-4 shadow-md rounded-md">
           <img
             className="w-full h-32 object-cover mb-4 rounded-md"
             src={blog.image.url}
             alt={`Blog ${blog.id}`}
           />
           <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
           <div className="text-gray-700 mb-2 max-h-12 overflow-hidden">
             {blog.description}
           </div>
           <p className="text-gray-500">{`By ${blog.user} on ${blog.date.slice(0, 10)}`}</p>
           
           {/* Read More Button */}
           <button 
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
              onClick={() => handleReadMore(blog)}// Assuming you have a function to handle the read more action
           >
             Read More
           </button>
         </div>
         
          ))}
        </div>
        <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        blog={selectedBlog} 
      />
      </div>
    </div>
  );
}

export default Blogs;
