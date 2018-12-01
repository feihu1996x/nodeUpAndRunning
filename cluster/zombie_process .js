// 杀死僵尸进程
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const rssWarn = (50 * 1024 * 1024), 
    heapWarn = (50 * 1024 * 1024);

const workers = {};

if(cluster.isMaster){
    for(var i=0;i<numCPUs;i++){
        createWorker()
    }
    setInterval(function(){
        // 大约每隔一秒
        // 主进程就会检查所有的工作进程
        // 看看是否有某个进程已经超过5秒未更新状态
        var time = new Date().getTime();
        for(let pid in workers){
            if(workers.hasOwnProperty(pid) && workers[pid].lastCb + 5000 < time){
                // 把阻塞的工作进程杀掉并重启
                workers[pid].worker.kill()
                delete workers[pid]
                console.log('Long running worker ' + pid + ' killed')
                createWorker()
            }
        }
    }, 1000);
}else{
    http.Server(function(req, res){
        if (Math.floor(Math.random() * 200) === 4) {
            // 让每个请求有1/200的概率会出错
            // 出错之后该进程的该请求事件的回调函数就会
            // 阻塞该进程的事件循环
            console.log('Stopped ' + process.pid + ' from ever finishing')
            while (true) { continue }
        }
        res.writeHead(200);
        res.end('hello world from ' + process.pid + '\n')        
    }).listen(8000, ()=>{
        console.log('Server running at http://127.0.0.1:8000');
    })
    setInterval(function report() {
        process.send({
            cmd: "reportMem", memory: process.memoryUsage(),
            process: process.pid
        })
    }, 1000)    
}

function createWorker() {
    var worker = cluster.fork()
    console.log('Created worker: ' + worker.process.pid)
    workers[worker.process.pid] = { worker: worker, lastCb: new Date().getTime() - 1000 }
    worker.on('message', function (m) {
        if (m.cmd === "reportMem") {
            // 每当一个工作进程向主进程发送报告时
            // 主进程都会记录报告的时间
            workers[m.process].lastCb = new Date().getTime()
            if (m.memory.rss > rssWarn) {
                console.log('Worker ' + m.process + ' using too much memory.')
            }
        }
    })
}