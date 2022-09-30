import { IPoll } from "../../@types/poll.d";
import PollTypes from "./pollTypes";

export const REFRESH_POLL_DATA_ACTION = (pollData:IPoll)=>{
    return {
        type:PollTypes.REFRESH_POLL_DATA,
        payload:pollData
    }
}

export const ADD_POLL_ACTION = (newAnswer:string)=>{
    return {
        type:PollTypes.ADD_POLL,
        payload:newAnswer
    }
}

export const RESET_POLL_ACTION = ()=>{
    return {
        type:PollTypes.RESET_POLL
    }
}

export const UPDATE_QUESTION_ACTION = (question:string)=>{
    return {
        type:PollTypes.UPDATE_QUESTION,
        payload:question
    }
}

export const UPDATE_SINGLE_ANSWER_ACTION = (id:string,answer:string)=>{
    return {
        type:PollTypes.UPDATE_SINGLE_ANSWER,
        payload:{id,answer}
    }
}

export const REMOVE_AN_ANSWER_ACTION = (id:string)=>{
    return {
        type:PollTypes.REMOVE_AN_ANSWER,
        payload:id
    }
}

export const SWITCH_ROLE_ACTION = (connected_role:string)=>{
    return {
        type:PollTypes.SWITCH_ROLE,
        payload:connected_role
    }
}

export const VOTING_ACTION = (id:string)=>{
    return {
        type:PollTypes.VOTING,
        payload:id
    }
}