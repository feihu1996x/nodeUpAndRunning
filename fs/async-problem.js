// 异步读取并删除文件
// 如果删除（unlink）发生在读取之前
// 就不可能读取到文件的内容了

const fs = require('fs');

fs.readFile('./temp', (err, data)=>{
    if(err){
        console.log(err)
    }else{
        console.log('temp: ' + data)
    }
})

fs.unlink('./temp', (err)=>{
    console.log(err);
});
