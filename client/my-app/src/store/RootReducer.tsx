
import {combineReducers} from "redux"
import pollReducer from "./Polls/pollReducer";

const RootReducer = combineReducers({
    Poll:pollReducer
});

export default RootReducer;