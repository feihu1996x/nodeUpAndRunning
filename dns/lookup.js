const dns = require('dns')

dns.lookup('baidu.com', 4, (e, a)=>{
    if(e){
        console.log(e)
    }else{
        console.log(a)
    }
})