var express = require('express');
var person =require('./connect')


var app = express();  //创建express的实例
app.get('/', function(req, res){
    var html = '<html>'
        +'<head>'
        +'<title>nodejs</title>'
        +'<style>'
        +'body {' +
        'color: brown}'
        +'</style>'
        +'</head>'
        +'<body>'
        +	'hello world! 1234'
        +'</body>'
        +'</html>';

    res.write(html); //服务器响应请求
});
app.listen(3000,function(){    //监听3000端口
    console.log("Server running at 3100 port");
});


/*	var http = require('http');
	http.createServer(function(req, res){
		var html = '<html>'
		+'<head>'
		+'<title>nodejs</title>'
		+'</head>'
		+'<body>'
		+	'hello world! 1234'
		+'</body>'
		+'</html>';
		res.writeHead(200,{'Content-Type' : 'text/html'});
		res.write(html);
		res.end();
	}).listen(8888);
*/