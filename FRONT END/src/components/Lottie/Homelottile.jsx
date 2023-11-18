import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../../Lotti/homelotti.json'

export default function Homelottile() {
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
        // height={400}
        // width={400}
      />
    </div>
  )
}
