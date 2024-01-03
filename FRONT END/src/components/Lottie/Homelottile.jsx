import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../Lotti/homelotti.json';

const Homelottile = () => {
  return (
    <div>
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice"
        }}
        width={window.innerWidth <= 1024 ? 390 : 650}
        height={window.innerWidth <= 1024 ? 400 : 600}
      />
    </div>
  );
};

export default Homelottile;
