const mongoose = require('mongoose');

const bcrypt = require('bcrypt')
// bcrypt -> salt를 이용해서 비밀번호 암호화
// saltRounds : salt가 몇글자인지 정의
const saltRounds = 10

const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type : String,
        maxlength : 50
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        minlength : 5
    },
    lastname:{
        type: String,
        maxlength : 50
    },
    role:{
        type :Number,
        default : 0
    },
    image:String,
    token :{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

// save 함수를 실행하기 전에
userSchema.pre('save', function(next){
    // 비밀번호를 암호화 시킨다.
    
    var user = this;

    if(user.isModified('password')){
        // salt 생성
        bcrypt.genSalt(saltRounds, function(err, salt){
        if(err) return next(err)
        // 첫번째 인자로는 암호화되지 않은 비밀번호
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err)
            user.password = hash
            next()
        })
    })
    } else {
        next()
    }
}
)

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword : 12345678
    // encoded Password : $2b$10$6HtUATRfbYXmpnvw34PosuPOGuWrJCpCrdQlGzW40Of1DPH5XsaHK

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        // 같지 않은 경우
        if(err) return cb(err)
        // 같은 경우
        cb(null, isMatch)

    })
}

userSchema.methods.generateUserToken = function(cb){
    
    var user = this;
    // json을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'anythingOK?')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // token을 decode 해준다.
    // token = user._id + 'anythingOK?'

    jwt.verify(token, 'anythingOK?', function(err, decoded){
        // user_id를 이용해서 유저를 찾고,
        // 클라이언트에서 가져온 token 과 DB에 보관된 token의 일치를 확인
        user.findOne({"_id" : decoded, "token" : token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })

}

const User = mongoose.model('User', userSchema)

module.exports = {User}