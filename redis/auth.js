const redis = require('redis'),
    client = redis.createClient()

//  auth命令必须在其他操作之前执行
//  客户端会保存密码
//  并且在重新连接的时候使用
//  Redis并没有提供用户管理功能
//  因为这会增加开销
client.auth('your-password')