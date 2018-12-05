const http = require('http')

http.createServer((req, res)=>{
    //  创建一个名为dbname的CouchDB数据库
    let options = {
        hostname: '127.0.0.1',
        port: 5984,
        path: '/dbname',
        method: 'PUT',
        auth: 'root:Q6$%xO0s'
    }
    let request = http.request(options, (response)=>{
        let responseBody = ''
        response.setEncoding('utf8')
        response.on('data', (chunk) => {
            responseBody += chunk
        });
        response.on('end', () => {
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(responseBody)
            res.end()
        });        
    })
    request.end()
}).listen(8000, ()=>{
    console.log('Server running at http://127.0.0.1:8000')
})
