var mysql = require( 'mysql');  //导入mysql模块
var express = require('express');

var app = express();  //创建express的实例

var str;

var connection = mysql.createConnection({   //配置连接参数
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'world'
});

    connection.connect(function (err) {
        if(err){
            //console.log(`有错误发生:'${err}`);  //模板字符串
            console.log('有错误发生:' + err.message);
        }else{
            console.log('数据库连接成功');

        }

    });     //连接

    connection.query( 'SELECT * FROM collapse.use;', function(err, results, fields) {
        if (err) {
            console.log(err);
        }else{
            str = JSON.stringify(results);
           //console.log(results);
        }
    });

    app.get('/', function(req, res){
        res.send(str); //服务器响应请求
    });
    app.listen(3000,function(){    //监听3000端口
        console.log("Server running at 3000 port");
    });



/*
load data infile 'H:/s'
into table datas
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\r\n';

LOAD DATA INFILE 'H:/s.csv'
INTO TABLE datas
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
IGNORE 1 ROWS;
LINES TERMINATED BY '\r\n';

C:/ProgramData/MySQL/MySQL Server 5.6/Uploads

fields terminated by ',' optionally enclosed by '"' escaped by '"'


C:/Users/tesla/Desktop/shanxi.csv


CREATE TABLE `datax` () ENGINE = InnoDB

CREATE TABLE datax();

CREATE TABLE IF NOT EXISTS datas (
    datas_id INT(11) NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (datas_id)
) ENGINE=InnoDB;
 */

