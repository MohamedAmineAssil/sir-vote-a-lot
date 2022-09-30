import React, { useEffect, useMemo, useState} from 'react';
import Header from './components/Header/Header';
import PollForm from './components/PollForm/PollForm';
import Poll from './components/Poll/Poll';
import PollResult from './components/PollResult/PollResult';

import './App.css';

import { REFRESH_POLL_DATA_ACTION } from './store/Polls/pollActions';
import { useDispatch } from 'react-redux';
import useSocket from './hooks/useSocket';
import { useSelector } from 'react-redux';
import { RootState } from './store/Store';

function App() {

  // state
  const {connected_role} =  useSelector((state:RootState)=>(state.Poll));

  // socket
  const {socket} = useSocket();
  // dispatch
  const dispatch = useDispatch();

  // handle socket
  useEffect(()=>{
    socket.on("new_result",(data)=>{
      dispatch(REFRESH_POLL_DATA_ACTION(data));
    });
  },[socket]);

  return (
      <div className="App">
        <div className='container'>
            <Header title="Sir Vote-a-lot" />
            <section className='Main'>
            { (connected_role == "Owner") &&  <PollForm/> }
            { (connected_role == "Respondent") &&  <Poll/>  }
            { (connected_role == "Owner" || connected_role == "User" || connected_role == "Respondent") &&  <PollResult/> }
            </section>
        </div>
      </div>
  );

}

export default App;

/*

  // send message
  const sendMessage = () =>{
    socket.emit("vote",{"message":message});
    setMessage("");
  }

  // Handle Socket on mount
  useEffect(()=>{
    socket.on("new_result",(data)=>{
      setNewMessage(data.message)
    });
  },[]); //socket

      <h1>Hello world</h1>
      <input value={message} placeholder='Message' onChange={(event)=>{
        setMessage(event.target.value)
      }}/>
      <button onClick={sendMessage}>Send</button>

      <p>{newMessage}</p>

*/