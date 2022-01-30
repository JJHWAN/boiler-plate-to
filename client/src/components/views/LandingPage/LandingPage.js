import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage(){

    let navigate = useNavigate();
    // Landing page에 들어오자 마자 아래 함수? 기능 실행
    useEffect(()=>{
        // 서버에 api/hello 전송
        axios.get('/api/hello')
        .then(response => console.log(response.data))
         // 서버에서 돌아온 response를 console 창에 출력
    }, [])

    const onClickHandler = () =>{
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                navigate('/login');
            } else {
                alert('Error')
            }
        })
    }

    return (
        <div style = {{
            display: 'flex', justifyContent: 'center', alignItems : 'center',
            width:'100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
            <br/>
            <button onClick = {onClickHandler}>
                로그아웃
            </button>
        </div>
    );
}

export default LandingPage;
