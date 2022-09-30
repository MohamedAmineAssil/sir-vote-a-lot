import React, { useEffect, useState ,useRef } from 'react';
import "./TextInput.css";

interface IProps{
    value?:string,
    name:string,
    placeholder:string,
    style?:{},
    defaultValue?:string | number,
    onChange:(event:React.ChangeEvent<HTMLInputElement>) => void,
    maxlength?:number
}

function TextInput({value,name,placeholder,style,onChange,defaultValue,maxlength} :IProps) {

  const input = useRef<HTMLInputElement>(null);

  const [disabled,setDisabled] = useState(false);

  useEffect(()=>{

    if(String(value).length > Number(maxlength)){
      setDisabled(true);
      //input.current?.setAttribute("disabled",""); // uncomment to disable the input completely
    }   

  },[value,onChange]);

  return (
    <input 
        className='TextInput'
        value={value}
        name={name}
        placeholder={placeholder}
        style={style}
        onChange={onChange}
        defaultValue={defaultValue}
        maxLength={maxlength}
        //disabled={disabled}
        ref={input}
    />
  )
}

export default TextInput