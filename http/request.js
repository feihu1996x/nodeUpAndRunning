const http = require('http');
const querystring = require('querystring');

let postData = querystring.stringify({
    'comment[movie]': '5bec33d0e605581c4fcbd2f2',
    'comment[from]': '5be92fcf66dee5334bde599c',
    'comment[content]': '技术刷评论~',
});

let options = {
    hostname: 'dev.feihu1996.cn',
    port: 80,
    path: '/koaMovie/movie/comment',
    method: 'POST', // 默认会设置为GET
    headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36',
        'Cookies': 'koa:sess=eyJ1c2VyIjp7Il9pZCI6IjViZTkyZmNmNjZkZWU1MzM0YmRlNTk5YyIsIm5pY2tuYW1lIjoiYW5ndXMiLCJyb2xlIjoiYWRtaW4ifSwiX2V4cGlyZSI6MTU0Mjk0OTEyMDI2OSwiX21heEFnZSI6ODY0MDAwMDB9;koa:sess.sig=sPpsCtHSpcZl5EnxXaZXw2uxiDU',
        'Content-Length': postData.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'http://dev.feihu1996.cn/koaMovie/movie/detail/5bec33d0e605581c4fcbd2f2',
        'Origin': 'http://dev.feihu1996.cn',
        'Connection': 'keep-alive',
        'Host': 'dev.feihu1996.cn',
    },
};

// 调用http.request()工厂方法
// 创建一个http.ClientRequest实例
// 传入options对象和回调函数
// 传入的回调函数会监听response事件
// HTTP请求的正文内容
// 实际上是通过response对象的数据流获得的
const req = http.request(options, (res) => {
    // http.ClientResponse对象保存了关于请求的许多信息
    // 还挂了多个很有用的数据流和属性
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    // 如果不指定编码方式，
    // 得到的结果将是Buffer对象的裸数据
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        // 监听response对象的data事件
        // 以便于数据可用时就能处理
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// 发送上行数据流
// 数据会马上上传（不会被缓存）
req.write(postData);
// req.write(morePostData);

// 显示调用http.ClientRequest.end()
// 表示数据发送完毕
// request会等待end()调用后
// 才初始化HTTP请求
req.end();