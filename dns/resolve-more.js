const dns = require('dns')

dns.resolve('smtp.sina.com', 'MX', (e, r)=>{
    if(e){
        console.log(e)
    }else{
        console.log(r)
    }
})

dns.resolveMx('smtp.sina.com', (e, r)=>{
    if(e){
        console.log(e)
    }else{
        console.log(r)
    }    
})