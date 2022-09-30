import React from 'react';

interface IProps{
    content:string,
    style?:{}
}

function Label({content,style}:IProps) {
  return (
    <p style={style}>{content}</p>
  )
}

export default Label