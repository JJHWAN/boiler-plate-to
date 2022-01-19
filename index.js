const express = require('express')
// express 모듈을 가져옴
const app = express()
// express 앱 생성
const port = 3000
// back server port 설정

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://pp10202:ghkswn12@boiler-plate.qta9o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>console.log('MongoDB Connected...'))
.catch(err=> console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})