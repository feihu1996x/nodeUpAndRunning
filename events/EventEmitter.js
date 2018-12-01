const util = require('util')
const EventEmitter = require('events').EventEmitter

const Server = function(){
    console.log('Server init')
}

// 将Server类的原型
// 设置为EventEmitter类的实例
// 从而实现继承
util.inherits(Server, EventEmitter)

const s = new Server()

// 事件是针对特定的基于EventEmitter的对象
// 不存在全局的事件
// Server类不同的实例之间也不会共享事件

// on方法为一个事件创建了监听器
// on方法接受两个参数:
// 需要监听的事件的名称
// 当事件触发时需要调用的函数
s.on('abc', function abc() {
    if (arguments.length <= 1) {
        // 如果传给emit()的参数只有1个
        // 或更少
        // 直接调用call方法
        // 速度快
        if(arguments.length > 0){
            handler.call(this, arguments[0])            
        }else{
            console.log('abc')
        }
    }else{
        // 如果传给emit()的参数多于1个
        // 使用较慢的apply方法
        // 以数组的方式传递所有的参数
        var args = Array.prototype.slice.call(arguments, 1)
        handler.apply(this, args)
    }
})

// on方法为同一个事件创建了另外一个监听器
// 同一个事件的监听器默认最多只能有10个
// s.setMaxListeners()可以改变这个数量
s.on('abc', stillAbc)

// 触发一个事件
s.emit('abc')

// 当调用emit时
// 除了事件的名称
// 还可以传入任意数目的参数
// 这些参数都将传给监听该事件的函数
s.emit('abc', 'a', 'b', 'c')

function handler(){
    // 事件监听器被调用的时候
    // 在EventEmitter的上下文中
    // 而不是它们原始的位置
    console.log(this);
    for(var i = 0;i<arguments.length;i++){
        console.log(arguments[i])
    }
}

function stillAbc(){
    console.log('still abc')
}

// 获取事件监听器的数量
console.log(s.listeners('abc').length); // 2

// 移除指定的事件监听器
s.removeListener('abc', stillAbc)

// 获取事件监听器的数量
console.log(EventEmitter.listenerCount(s, 'abc')); // 1

// 移除所有的事件监听器
s.removeAllListeners('abc');

// 获取事件监听器的数量
console.log(s.listeners('abc').length); // 0
