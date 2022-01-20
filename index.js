const express = require('express')
// express 모듈을 가져옴
const app = express()
// express 앱 생성
const port = 3000
// back server port 설정

const bodyParser = require('body-parser')
// User model 가져오기
const {User} = require("./models/User")

const config = require('./config/key')

// body-Parser가 client에서 오는 정보를 서버에서 분석해서 가져올 수 있도록 함
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extend : true}));
// application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) =>{
  // 회원가입 시 필요한 정보들을 client에서 가져오면
  // 그 정보들을 데이터 베이스에 저장해준다.
  
  // req.body 내부에는 json 형식으로
  // {id : XXX, password : YYY} 식으로 넘어온다.
  const user = new User(req.body)

  user.save((err, doc)=>{
    if(err) return res.json({sucess : false, err})
    return res.status(200).json({
      sucess:true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})