import React from 'react';
import "./Button.css";

interface IProps{
    text:string
    style?:{},
    onClick?:() => void,
    disabled?:boolean
}

function Button({text,style,onClick,disabled}:IProps) {
  return (
    <button disabled={disabled} onClick={onClick} className='Button' style={style}>{text}</button>
  )
}

export default Button;