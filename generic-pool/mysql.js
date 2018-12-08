const mysql = require('mysql')
const genericPool = require('generic-pool')

/**
 * 当客户尝试获取一个连接时,
 * 如果没有已经打开的连接,
 * 连接池会调用创建函数
 * 如果一个连接闲置太久了
 * 由 idleTimeoutMillis 属性来指定空闲间隔,以毫秒来计算
 * 它会被销毁并且释放内存资源
 */ 

/**
 * Step 1 - Create pool using a factory object
 */
const factory = {
  create: function() {
    const db = mysql.createConnection({
        host: '127.0.0.1',
        user: 'test',
        password: '*3!0CcEf',
        database: 'upandrunning',
    })
    db.connect()
    return db
  },
  destroy: function(client) {
    client.end()
  }
}
 
const opts = {
  max: 10, // maximum size of the pool
  min: 2 // minimum size of the pool
}

const myPool = genericPool.createPool(factory, opts)
 
/**
 * Step 2 - Use pool in your code to acquire/release resources
 */
 
// acquire connection - Promise is resolved
// once a resource becomes available
const resourcePromise = myPool.acquire()
 
resourcePromise
  .then(function(client) {
    client.query("SELECT * FROM users", [], function(error, results, field) {
        if(error){
            throw error
        }else{
            console.log(results)
        }        
        // return object back to pool
        myPool.release(client)
    })
  })
  .catch(function(err) {
    // handle error - this is generally a timeout or maxWaitingClients
    // error
    console.log(err)
  })
 
/**
 * Step 3 - Drain pool during shutdown (optional)
 */
// Only call this once in your application -- at the point you want
// to shutdown and stop using this pool.
myPool.drain().then(function() {
  myPool.clear()
})