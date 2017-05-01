var express = require('express');
var path=require('path');
var body=require('body-parser');
var ejs=require('ejs');
var mysql= require('mysql');
var app = express();
//数据库
var connection = mysql.createConnection({
    host     : 'sqld.duapp.com',
    user     : '9179fcc4c71f4ca387722f7977b3ac19',
    port     : '4050',
    password : '52925ea69b9045cf914bae5922e08e80',
    database : 'gWLBiTVpQfmHcSMZdjNv'
});
connection.connect();

app.set('views', path.join(__dirname,'./template'));
app.set('view engine',"ejs");

app.use(express.static(path.join(__dirname,"static")));
app.use(body.urlencoded({ extended: true }));

app.get("/",function (req,res) {
    res.render("index")
});
//查询
app.get("/select",function (req,res) {
    connection.query('select * from aaa', function (error, results) {
        if (error) throw error;
        res.send(JSON.stringify(results))
    });
});
//删除
app.get("/del/:id",function (req,res) {
    let delId=req.params.id;
    connection.query('delete from aaa where id='+delId, function (error, results) {
        if (error) throw error;
        if(results.affectedRows>0){
            res.send("ok")
        }
    });
});
//修改
app.get("/update",function (req,res) {
    let id=req.query.id;
    let name=req.query.name;
    let values=req.query.values;
    connection.query(`update aaa set ${name}='${values}' where id=${id}`, function (error, results) {
        if (error) throw error;
        if(results.affectedRows>0){
            res.send("ok")
        }
    });
});
app.get("/addInfo",function (req,res) {
    let name=req.query.name;
    let sex=req.query.sex;
    let age=req.query.age;
    connection.query(`insert into aaa (name,age,sex) value ('${name}','${sex}','${age}')`, function (error, results) {
        if (error) throw error;
        if(results.affectedRows>0){
            res.send(JSON.stringify(results));
        }
    });
});
app.listen(18080);

