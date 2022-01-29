import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage(){

    // Landing page에 들어오자 마자 아래 함수? 기능 실행
    useEffect(()=>{
        // 서버에 api/hello 전송
        axios.get('/api/hello')
        .then(response => console.log(response.data))
         // 서버에서 돌아온 response를 console 창에 출력
    }, [])
    return (
        <div>
            LandingPage, Hello world
        </div>
    );
}

export default LandingPage;
