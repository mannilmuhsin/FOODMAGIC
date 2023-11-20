import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../Lotti/homelotti.json'

export default function Homelottile() {


  const breakpoints = {
    small: 480,   // Adjust as needed
    medium: 768,  // Adjust as needed
    large: 1024,  // Adjust as needed
  };

  // Determine the size based on the screen width
  const getSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= breakpoints.large) {
      return { width: 390, height: 400 };
    } else {
      return { width: 700, height: 700 };
    }
  };
  const size = getSize();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  return (
    <div>
      <Lottie 
	    options={defaultOptions}
      width={size.width}
      height={size.height}
      />
    </div>
  )
}
