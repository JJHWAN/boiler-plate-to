const {Usre, User} = require('../models/User')

let auth = (req, res, next)=>{
    // 인증 처리를 하는 곳

    // 1. 클라이언트 쿠키에서 token을 가져온다.
    let token = req.cookies.x_auth;
    // 2. token을 다시 Decode 하고, DB에서 유저를 검색한다.
    User.findByToken(token, (err, user) =>{
        if(err) throw err
        if(!user) return res.json({isAuth : false, error : true})
        // 3. 유저가 있으면 OK, 없으면 No
        
        // req를 받을 때, token과 user를 넣어주어서 이후 단계에서 처리 용이
        req.token = token;
        req.user = user;
        // middleware 단계 끝났으면 다음 단계로,
        next()
    })
}

module.exports = {auth};