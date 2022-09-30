import React from 'react';
import "./Empty.css";

interface IProps{
    imgSrc:string
}

function Empty({imgSrc}:IProps) {
  return (
    <div className='EmptyContainer'>
        <img src={imgSrc} alt="empty"/>
    </div>
  )
}

export default Empty