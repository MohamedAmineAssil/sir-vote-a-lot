import React from 'react';

interface IProps {
    children:React.ReactNode
}

function TextInputWithButton({children}:IProps) {
  return (
    <div className='TextInputWithButtonContainer'>
       {children}
    </div>
  )
}

export default TextInputWithButton