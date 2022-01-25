if(process.env.NODE_ENV=='production'){
    // 만약 배포 이후인 경우
    module.exports = require('./prod')
} else {
    module.exports = require('./dev.js')
}