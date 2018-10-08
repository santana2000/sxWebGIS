var express = require('express');
var person =require('./connect')


var app = express();  //创建express的实例
app.get('/', function(req, res){
    //res.send("hi"); //服务器响应请求
    res.send(person); //服务器响应请求
});
app.listen(3000,function(){    //监听3000端口
    console.log("Server running at 3100 port");
});
