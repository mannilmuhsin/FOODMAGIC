import React from 'react';

const Modal = ({ isOpen, onClose, blog }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        backdropFilter: 'blur(5px)' // Blurs the background
      }}>
      <div className="bg-white p-6 rounded-md shadow-md w-3/4 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <div className='flex justify-center  '>
        <img
          className="w-3/4 h-96 object-cover mb-4 rounded-md"
          src={blog.image.url}
          alt={`Blog ${blog.id}`}
        />
        </div>
        <div className="text-gray-700 mb-2  pb-8 border-b-2 ">
             {blog.description}
           </div>
        {/* Rendering Rich Text Content Safely */}
        <div dangerouslySetInnerHTML={{ __html: blog.content }} className="text-gray-700 mb-2"></div>
        
        <p className="text-gray-500">{`By ${blog.user} on ${blog.date.slice(0, 10)}`}</p>
        <button 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
