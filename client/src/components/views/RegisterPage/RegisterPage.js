import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from "../../../_actions/user_action"
import { useNavigate } from 'react-router-dom';

function RegisterPage(){

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) =>{
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) =>{
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) =>{
        // 로그인 버튼을 눌렀을 때, 창이 새로고침 되는걸 막기 위함
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            name : Name,
            email : Email,
            password : Password
        }

        dispatch(registerUser(body))
        .then(response =>{
            if(response.payload.success){
                navigate('/');
            } else{
                alert('Error')
            }
        })
    }

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems : 'center',
            width:'100%', height: '100vh'
        }}>
        <form style ={{ display : 'flex', flexDirection : 'column' }}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type = "email" value = {Email} onChange = {onEmailHandler}/>
            <label>Name</label>
            <input type = "text" value = {Name} onChange = {onNameHandler}/>
            <label>Password</label>
            <input type = "Password" value = {Password} onChange = {onPasswordHandler}/>
            <label>Confirm Password</label>
            <input type = "Password" value = {ConfirmPassword} onChange = {onConfirmPasswordHandler}/>
            <br/>
            <button type = "submit">
                Register
            </button>
            
        </form>
        </div>
    );
}

export default RegisterPage;
