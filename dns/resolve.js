const dns = require('dns')

dns.resolve('feihu1996.cn', 'A', (e, r)=>{
    if(e){
        console.log(e)
    }else{
        console.log(r)
    }
})