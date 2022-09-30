import React, { useEffect, useState  } from 'react';
import Button from '../FormInput/Button/Button';
import Label from '../FormInput/Label/Label';
import LabelWithButton from '../FormInput/LabelWithButton/LabelWithButton';
import TextInput from '../FormInput/TextInput/TextInput';
import TextInputWithButton from '../FormInput/TextInputWithButton/TextInputWithButton';
import "./PollForm.css";

import { useSelector , useDispatch , shallowEqual} from 'react-redux';

import { IPollQuestionOptions} from '../../@types/poll.d';
import { RootState } from '../../store/Store';

import { ADD_POLL_ACTION , UPDATE_QUESTION_ACTION , REMOVE_AN_ANSWER_ACTION , RESET_POLL_ACTION, UPDATE_SINGLE_ANSWER_ACTION  } from "../../store/Polls/pollActions";

interface IProps{
  children?: React.ReactNode,
}

function PollForm( props :IProps) {

  // Dipatcher 
  const dispatch = useDispatch();

  // use Selector
  const {poll_main_question,poll_question_options} = useSelector((state:RootState) =>(state.Poll));

  // Initiate states
  const [newAnswer,setNewAnswer] = useState<string>("");

  // Initiate states
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAnswer(event.target.value);
  };

  // handle question change
  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(UPDATE_QUESTION_ACTION(event.target.value));
  };

  // handle new answer 
  const handleSingleAnswerChange = (event: React.ChangeEvent<HTMLInputElement> , id : string) => {
    console.log(event.target.value,id);
    dispatch(UPDATE_SINGLE_ANSWER_ACTION(id,event.target.value));
  };

  useEffect(()=>{ 
  },[]);

  // handle click add
  const addNewAnswer = () =>{

    if(newAnswer != ""){
      dispatch(ADD_POLL_ACTION(newAnswer));
      setNewAnswer("");
    }
  }

  //removeAnswer
  const removeAnswer = (id:string)=>{
      if(poll_question_options.length > 2){
        dispatch(REMOVE_AN_ANSWER_ACTION(id));
      }else{
          // must have 2 options at least
      }
  }

  //resetPoll
  const resetPoll = ()=>{
    dispatch(RESET_POLL_ACTION());
  }

  return(

    <section className='Section'>

      <div className='SubSection'>

        <div className='PollQuestionContainer'>

          <TextInput style={{width:"calc(100% - 99px)",marginRight:"15px"}} 
                     name="poll_question" 
                     placeholder="Type your question"
                     value={String(poll_main_question)}
                     onChange={(event)=>{handleQuestionChange(event)}}
                     maxlength={80}
          />

          <div className='PollQuestion'>
              {
                poll_question_options.map((poll:IPollQuestionOptions,ind:IPollQuestionOptions["id"])=>{
                  return(
                    <TextInputWithButton key={poll.id}>
                      <TextInput style={{width:"calc(100% - 99px)",marginRight:"15px"}} 
                                 key={poll.id} 
                                 name="poll_question"
                                 placeholder="Type an answer"
                                 onChange={(event) => {handleSingleAnswerChange(event,String(poll.id))}}
                                 defaultValue={String(poll.answer)}
                                 maxlength={80}
                      />
                      <Button disabled={poll_question_options.length <=2 ? true : false} 
                              onClick={()=>{removeAnswer(String(poll.id))}} 
                              style={{"width":"60px",height:"40px"}} 
                              text="X"/>
                    </TextInputWithButton>
                  )
                })
              }

          </div>

          {
                 poll_question_options.length < 10 && <TextInputWithButton>
                      <TextInput style={{width:"calc(100% - 99px)",marginRight:"15px"}} 
                                  onChange={handleAnswerChange}
                                  name="poll_question" 
                                  placeholder="Type an answer"
                                  value={newAnswer}
                                  maxlength={80}
                      />
                      <Button onClick={addNewAnswer} style={{"width":"60px",height:"40px"}} text="Add"/>
                  </TextInputWithButton>
          }

        </div>

      
      </div>

      <LabelWithButton>
             <Label style={{marginRight:"15px"}} content={`${poll_question_options.length}/10 Possible answers`}/>
              <Button onClick={resetPoll} style={{minWidth:"80px",height:"40px"}} text="Reset"/>
      </LabelWithButton>

    </section>
  )
}

export default PollForm;