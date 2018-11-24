/*
    测试POST API
*/

const http = require('http'),
    assert = require('assert');

// assert 是Node 的一个核心模块
// 它能帮助我们用多种方式来对返回值进行测试
// 当一个值与预期的条件不符时，将抛出异常

const opts = {
    host: '127.0.0.1',
    port: 8000,
    path: '/send',
    method: 'POST',
    headers: {'content-type':'application/x-www-form-urlencoded'}
};

// 使用http.request() 这一工厂方法
// 创建新的http 请求对象，
// 通过配置options 的一系列属性，
// 来让http.Request 对象按我们的要求运行
const req = http.request(opts, function(res){
    // 指定了所有接收数据的编码方式
    res.setEncoding('utf8');
    let data = '';
    res.on('data', (chunk)=>{
        // 指定响应返回时的data事件监听函数
        // 以流式方式处理
        // 来自服务器的所有响应数据
        // 可以一边接收数据一边处理
        data += chunk;
    });
    res.on('end', ()=>{
        // 当我们把服务器返回的数据接收完整后
        // end 事件才会被触发
        // 利用assert.strictEqual 函数
        // 我们能对数据进行“===”级别的一致性检查
        assert.strictEqual(data, '{"status":"OK","message":"Tweet received"}')
    });
});

// 调用write()函数来发送测试数据
req.write('tweet=test');

// 调用end() 方法来表示数据已经发送完毕
req.end();