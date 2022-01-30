const express = require('express')
// express 모듈을 가져옴
const app = express()
// express 앱 생성
const port = 5000
// back server port 설정

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// User model 가져오기
const {User} = require("./models/User")
const {auth} = require("./middleware/auth")
const config = require('./config/key')

// body-Parser가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있도록 함
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extend : true}));
// application/json
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err))

app.get('/api/hello', (req, res)=>{
  res.send("안녕하세요 from api/hello");
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register', (req, res) =>{
  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그 정보들을 데이터 베이스에 저장해준다.
  
  // req.body 내부에는 json 형식으로
  // {id : XXX, password : YYY} 식으로 넘어온다.
  const user = new User(req.body)

  // save 하기전에 비밀번호 암호화 필요
  user.save((err, doc)=>{
    if(err) return res.json({success : false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.post('/api/users/login', (req, res) => {
  console.log("in server/index.js api login", req)
  // 1. 요청된 이메일을 DB에서 검색
  User.findOne({email : req.body.email}, (err, user)=>{
    if(!user){
      // DB내부에 없는 경우
      return res.json({
        loginSuccess : false,
        message : "해당 이메일의 대응하는 유저가 없습니다."
      })
    }
    // 2. 요청된 이메일이 DB에 있으면 입력으로 들어온 비밀번호와 DB에 들어있는 비밀번호 대조
    user.comparePassword(req.body.password, (err, isMatch) =>{
      if(!isMatch){
        return res.json({
          loginSuccess : false,
          message : "비밀번호가 틀렸습니다."
        })
      }
      // 3. 비밀번호까지 같다면 유저를 위한 Token 생성
      user.generateUserToken((err, user)=>{
        if(err) return res.status(400).send(err)
        // token을 저장한다. 어디에? 쿠키, 로컬 스토리지 .. 여러가지 방법이 있음
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess : true, userID : user._id})
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res)=>{
  // auth -> req 를 받고, call back function을 실행하기 전에 전처리를 해주는 무언가
  // middle ware에서 decode, 검색, req.user, req.token에 값 저장
  // 여기까지 왔다는 이야기는 Authentication 이 true라는 이야기

  req.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role == 0? false : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image
  })
})

app.get('/api/users/logout', auth, (req, res)=>{
  console.log('req.user', req.user)
  User.findOneAndUpdate({_id : req.user._id}, 
    {token : ""},
    (err, user) =>{
      if(err) return res.json({success : false, err});
      return res.status(200).send({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})