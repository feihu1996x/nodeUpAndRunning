// 采用回调函数嵌套
// 指定操作执行的次序
// 为避免出现callback hell
// 建议使用Promise

const fs = require('fs')

fs.readFile('temp', (err, data)=>{
    if(err){
        console.log(err)
    }else{
        console.log('temp:', data)
        fs.unlink('temp', (err)=>{
            console.log(err)
        })
    }
})