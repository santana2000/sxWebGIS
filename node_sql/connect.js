var mysql = require( 'mysql');  //导入mysql模块

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

// connection.query( 'SELECT * FROM world.countrylanguage;', function(err, results, fields) {
//     if (err) {
//         console.log(err);
//     }else{
//         console.log(results);
//     }
// })