import React, { useEffect, useState } from 'react';
import Button from '../FormInput/Button/Button';
import LabelWithButton from '../FormInput/LabelWithButton/LabelWithButton';
import OptionList from '../FormInput/OptionList/OptionList';

import { IPollQuestionOptions } from '../../@types/poll.d';

import { RootState } from '../../store/Store';
import { useSelector , useDispatch } from 'react-redux';

import { VOTING_ACTION } from "../../store/Polls/pollActions";
import Empty from '../FormInput/Empty/Empty';

interface IProps{}

function Poll(props:IProps) {

  const {poll_question_options, poll_main_question} = useSelector((state:RootState) => (state.Poll));

  // dispatch
  const dispatch = useDispatch();

  useEffect(()=>{
    
  },[poll_main_question]);

  const [selectedAnswer,setSelectedAnswer] = useState<string>("");

  return (
    <section className='Section'>

      {
          (poll_question_options.length < 2 )  ?
              <div className='SubSection'>
                <Empty imgSrc={"./icons/emptyPoll.png"} /> 
              </div>
          : 

          <div className='SubSection'>

            <h1>{poll_main_question}</h1>

            <div className='PollQuestionContainer'>

              <div className='PollQuestion'>
                  {
                    poll_question_options.map((poll:IPollQuestionOptions,ind:IPollQuestionOptions["id"])=>{
                      return( poll.answer!= "" && <OptionList onClick={()=>{ setSelectedAnswer(String(poll.id))}} 
                        key={poll.id} id={"Radio"+ind} name="option" value={poll.answer} type="Radio"/>
                      )
                    })
                  }
              </div>

            </div>

          </div>

      }
      {
          poll_question_options.length >= 2  && <LabelWithButton style={{justifyContent:"flex-end"}}>
                        <Button onClick={()=>{dispatch(VOTING_ACTION(selectedAnswer))}} style={{minWidth:"80px",height:"40px"}} text="Vote"/>
                </LabelWithButton>
      }
    </section>
  )
}

export default Poll;