import { IPollQuestionOptions } from "../../@types/poll.d";
import PollTypes from "./pollTypes";
import { v4 as uuidv4 } from 'uuid';
import useSocket from "../../hooks/useSocket";

type TPayload = {
    id:string ,
    content:string
}

interface IAction{
    type:string,
    payload: TPayload | string | number | any
}

const initialState = {
    "connected_role":"Owner", //"Owner", "User" , "Respondent"
    "poll_main_question":"What is the value of π ?",
    "poll_question_options":[
        {
            id:1,
            answer:"3.14",
            votes:10
        },
        {
            id:2,
            answer:"3.15",
            votes:3
        },
        {
            id:3,
            answer:"3.16",
            votes:2
        },
    ]
}

const resetState =  {
    "connected_role":"Owner", //"Owner", "User" , "Respondent"
    "poll_main_question":"",
    "poll_question_options":[]
}

const PollReducer = (state=initialState,action:IAction ) =>{

    // use socket
    const {socket} = useSocket();

    switch(action.type){

        case PollTypes.REFRESH_POLL_DATA :{

            // action.payload.data

            const next_state = Object.assign({...state, 
                poll_question_options:action.payload.data.poll_question_options,
                poll_main_question:action.payload.data.poll_main_question
            });


            return next_state;
        }

        case PollTypes.ADD_POLL :{

            const next_state = Object.assign({...state, poll_question_options:[...state.poll_question_options,{
                id:uuidv4(),
                answer:action.payload,
                votes:0
            }]});

            // emit new result;
            socket.emit("refresh",{data:next_state});

            return next_state;
           
        }

        case PollTypes.RESET_POLL :{
            
            const next_state =  resetState;

            // emit new result;
            socket.emit("refresh",{data:next_state});

            return next_state;
        }

        case PollTypes.UPDATE_QUESTION :{

            const next_state = Object.assign({...state, poll_main_question:action.payload});

            // emit new result;
            socket.emit("refresh",{data:next_state});

            return next_state;
        }

        case PollTypes.REMOVE_AN_ANSWER :{

            const prev_state = Object.assign({...state});

            const new_poll_question_options = prev_state.poll_question_options.filter((poll:IPollQuestionOptions)=>{
                return poll.id != action.payload
            });

            const next_state = Object.assign({...state, poll_question_options:new_poll_question_options});

            // emit new result;
            socket.emit("refresh",{data:next_state});

            return next_state;

        }

        case PollTypes.UPDATE_SINGLE_ANSWER :{

            console.log("store =>",action.payload.id,action.payload.answer);

            const prev_state = Object.assign({...state});

            const new_poll_question_options = prev_state.poll_question_options.map((poll:IPollQuestionOptions)=>{
                if(poll.id == action.payload.id){
                   return Object.assign(poll,{answer:action.payload.answer});
                 }else{
                    return poll
                 } 
            });

            const next_state =  Object.assign({...state, poll_question_options:new_poll_question_options});

            // emit new result;
            socket.emit("refresh",{data:next_state});

            return next_state;

        }
        
        case PollTypes.SWITCH_ROLE :{

            const next_state =  Object.assign({...state, connected_role:action.payload});

            return next_state;

        }

        case PollTypes.VOTING :{

            const prev_state = Object.assign({...state});

            const new_poll_question_options = prev_state.poll_question_options.map((poll:IPollQuestionOptions)=>{
                if(poll.id == action.payload){
                   return Object.assign(poll, {votes:(poll.votes + 1)});
                 }else{
                    return poll
                 } 
            });

            // emit new result;
            const next_state = Object.assign({...state, poll_question_options:new_poll_question_options});

            // emit new result;
            socket.emit("refresh",{data:next_state});

            return next_state;

        }
    
        default:{
            return state;
        }

    }

}

export default PollReducer;
