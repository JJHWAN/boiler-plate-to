import {
    LOGIN_USER, REGISTER_USER
} from '../_actions/types'

export default function(previousState = {}, action){
    switch(action.type){
        case LOGIN_USER:
            // 이전 상태는 비어있는 State
            return {...previousState, loginSuccess : action.payload}
            break;
        case REGISTER_USER:
            return {...previousState, success : action.payload}
        default:
            return previousState;
    }
}