const vm = require('vm')
const fs = require('fs')

console.log(vm.runInThisContext('1+1'))  // => 2

var e = 0,
    v = 0

// eval()运行在当前作用域
console.log(eval(e=e+1)) // => 1
console.log(e) // => 1

// vm会在每一个实例的内部，维护一套独立的本地上下文，并且能够保持状态
// vm并不会影响运行在主事件循环中的本地作用域
console.log(vm.runInThisContext('v=1')) // => 1
console.log(vm.runInThisContext('v=v+1')) // => 2
console.log(v) // => 0

// 可以传给vm一个已经存在的上下文对象
// 该上下文会作为默认的上下文使用
var context = { alphabet:"" }
console.log(vm.runInNewContext("alphabet+='a'", context)) // => 'a'
console.log(vm.runInNewContext("alphabet+='b'", context)) // => 'ab'
console.log(context) // => { alphabet: 'ab' }

// 把代码预编译vm.Script对象
// 这样可以重复运行同一段代码
// 从而节省一些代码量
// 在运行的时候，可以选择用哪个上下文来执行
var code = `console.log(output)`
var script = vm.createScript(code)
script.runInNewContext({console,output:"Kick Ass"})

// 所有的vm运行命令都可以把文件名作为可选的最后一个参数
// 它不会改变其功能
// 但是允许我们设置出现错误时在消息里想要显示的文件名字