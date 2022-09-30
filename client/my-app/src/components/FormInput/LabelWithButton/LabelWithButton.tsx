import React from 'react';
import "./LabelWithButton.css"

interface IProps {
    children:React.ReactNode,
    style?:{}
}

function LabelWithButton({children,style}:IProps) {
  return (
    <div className='LabelWithButtonContainer' style={style}>
       {children}
    </div>
  )
}

export default LabelWithButton