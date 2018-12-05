const http = require('http')

http.createServer((req, res)=>{
    http.get('http://127.0.0.1:5984/_all_dbs', (response)=>{
        // 通过HTTP获取CouchDB的数据库列表
        let responseBody = ''
        response.on('data', (chunk)=>{
            responseBody += chunk
        })
        response.on('end', ()=>{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.write(responseBody)
            res.end()
        })
    })
}).listen(8000, ()=>{
    console.log('Server running at http://127.0.0.1:8000')
})