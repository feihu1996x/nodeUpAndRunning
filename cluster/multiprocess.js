// 使用集群来分发任务
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

const rssWarn = (12 * 1024 * 1024), 
    heapWarn = (10 * 1024 * 1024);

if(cluster.isMaster){
    // 主进程创建工作进程
    for(var i=0;i<numCPUs;i++){
        // 为每个CPU创建一个工作进程
        let worker = cluster.fork();
        // 主进程接收工作进程传递过来的消息
        // 也能把消息发回给工作进程
        // 主进程就成为了工作进程的一个轻量级控制接口
        worker.on('message', function(m){
            if (m.memory) {
                if (m.memory.rss > rssWarn) {
                    console.log('Worker ' + m.process + ' using too much memory.');
                }
            }            
        });
    }
    // cluster模块基于child_process模块
    // 因此，我们可以检查子进程的健康状态
    cluster.on('death', function(worker){
        console.log('worker ' + worker.pid + ' died');
        // 出现死亡进程后重新开启一个新的进程
        cluster.fork()
        .on('message', function(m){
            if (m.memory) {
                if (m.memory.rss > rssWarn) {
                    console.log('Worker ' + m.process + ' using too much memory.');
                }
            }            
        });        
    });
}else{
    // 工作进程创建http服务器
    http.Server(function(req, res){
        res.writeHead(200);
        res.end('Hello,World!\n');
    }).listen(8000, function(){
        // 所有工作进程可以共享一个socket连接
        // 其中一个堵塞了
        // 也不会影响其他工作进程的新连接
        console.log('Server running at http://127.0.0.1:8000');
    });
    // 工作进程可以传消息给主进程
    // 每秒报告一次当前工作进程的状态
    setInterval(function report(){
        process.send({
            memory: process.memoryUsage(),
            process: process.pid,
        });
    }, 1000);
}