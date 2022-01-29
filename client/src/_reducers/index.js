// Store 내부에 Reducer 다수 존재 가능
// Stage에서 State가 어떻게 변하고, newState를 return해주는게 reducer

// 위의 주석처럼 나눠진 Reducer들을 combineReducer를 이용해서
// rootRedcuer에서 하나로 합쳐준다.
import { combineReducers } from "redux";
//import user from './user_reducer';

const rootReducer = combineReducers({
    //user
})

export default rootReducer;