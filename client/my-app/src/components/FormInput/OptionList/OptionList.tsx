import React from 'react';
import "./OptionList.css";

interface IProps{
    id:string,
    name:string,
    value:string | number,
    type:string,
    onClick:()=>void
}

function OptionList({
    id,
    name,
    value,
    type,
    onClick
  }:IProps) {
  return (
    <div className="OptionListContainer">
        <input className="OptionListInput" type={type} id={id} name={name} value={value} onClick={onClick}/>
        <label className="OptionListLabel" htmlFor={id}>{value}</label>
    </div>
  )
}

export default OptionList;