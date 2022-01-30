import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataTosubmit){
    // redux에서 action 담당
    const request = axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data)

    // reducer로 보내야한다
    return {
        type : LOGIN_USER,
        payload : request
    }
}

export function registerUser(dataTosubmit){
    // redux에서 action 담당
    const request = axios.post('/api/users/register', dataTosubmit)
    .then(response => response.data)

    // reducer로 보내야한다
    return {
        type : REGISTER_USER,
        payload : request
    }
}

export function auth(dataTosubmit){
    const request = axios.get('/api/users/auth')
    .then(response => response.data)

    // reducer로 보내야한다
    return {
        type : AUTH_USER,
        payload : request
    }
}

