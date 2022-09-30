import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SWITCH_ROLE_ACTION } from '../../store/Polls/pollActions';
import { RootState } from '../../store/Store';
import DropDown from '../FormInput/DropDown/DropDown';
import './Header.css';

interface IHeader{
  title:string
}

function Header(props:IHeader) {

  // State
  const [role,setRole] = useState<string>("");

  // Dispatch
  const dispatch = useDispatch();

  //handle dropdown
  const handleDropDownChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setRole(event.target.value);
    dispatch(SWITCH_ROLE_ACTION(event.target.value));
  }

  return (
    <div className='Header'>
        <h1>{props.title}</h1>
        <DropDown onChange={handleDropDownChange}/>
    </div>
  )
}

export default Header;