# include <v8.h>

using namespace v8;

// 一个简单的Node附加组件
// 功能与在JavaScript里写上 exports.hello = "world"; 是等价的

extern "C" void init (Handle<Object> target) {
    HandleScope scope;
    target->Set(String::New("hello"), String::New("world"));
}