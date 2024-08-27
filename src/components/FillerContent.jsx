import React from 'react';
import phoneChat2 from '../assets/phoneChat2.jpg';
import phoneChat from '../assets/phoneChat.jpg';
import laptopChat from '../assets/laptopChat.jpg';


function FillerContent() {
  return (
    <div className="filler-container">
        <div className="welcome-heading">
            <h1 className='welcome-title'>MerryTess </h1>
            <h3 className='welcome-subtitle'>Gossip fast, free, and easy.</h3>
        </div>
        <img src={phoneChat2} className='image phone-walking-img img1'/>
        <div className="subphotos">
        <img src={phoneChat} className='image phone-walking-img img2'/>
        <img src={laptopChat} className='image phone-walking-img img3'/>
        </div>

    </div>
  )
}

export default FillerContent