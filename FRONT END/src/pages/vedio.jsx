import React from 'react';

function Video() {
  return (
    <div className='flex justify-center'>
      <h2>Video Player</h2>
      <video
        controls
        width="100%"
        style={{ maxWidth: '100vh',maxHeight:'100vh',  height: 'auto' }}
      >
        <source src="http://res.cloudinary.com/dswtrdxzw/video/upload/v1700472665/VIDEO_FOLDER_FOODMAGIC/1700472659029.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Video;
