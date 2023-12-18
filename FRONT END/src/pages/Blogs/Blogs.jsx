// src/components/Blogs.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function Blogs() {
    const blogs = [
        {
          id: 1,
          title: 'Professional Blog 1',
          description: 'Description for Blog 1',
          imageUrl: 'https://via.placeholder.com/700x300',
          author: 'John Doe',
          date: 'December 16, 2023',
        },
        {
          id: 2,
          title: 'Professional Blog 2',
          description: 'Description for Blog 2',
          imageUrl: 'https://via.placeholder.com/400x200',
          author: 'Jane Smith',
          date: 'December 17, 2023',
        },
        // Add more blogs as needed
      ];
      

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-24 relative">
        {/* Header with Full-width Image */}
        <div className="relative border-b-2 border-black pb-8 mb-8">
          <img
            className="w-full h-96 object-cover"
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fs3.amazonaws.com%2Fimg.mynetdiary.com%2Fblog%2Fhow-to-make-healthy-food-kitchen-set-up-ideas.jpeg&f=1&nofb=1&ipt=17807a9bee15a796edb1658ab0c0c6871be66da4f58980503f3f33b9d89f4e77&ipo=images"  // Replace with your image URL
            alt="Blog Header"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-8xl font-bold text-black absolute -top-16 bg-gradient-to-b from-white to-transparent border border-white p-4">
              BLOG
            </h1>
          </div>
        </div>

        {/* Previous Blogs */}
        <div className="mb-8 flex justify-center sm:justify-end">
          <Link to="/addblog" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Add Blog
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
          {blogs.map(blog => (
            <div key={blog.id} className="bg-white p-4 shadow-md rounded-md">
              <img
                className="w-full h-32 object-cover mb-4 rounded-md"
                src={blog.imageUrl}
                alt={`Blog ${blog.id}`}
              />
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-700 mb-2">{blog.description}</p>
              <p className="text-gray-500">{`By ${blog.author} on ${blog.date}`}</p>
            </div>
          ))}
        </div>

        {/* Add Blog Button */}
       
      </div>
    </div>
  );
}

export default Blogs;
