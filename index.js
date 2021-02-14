const express = require ("express");
const bodyParser = require ("body-parser");
const mysql = require('mysql');

const app = express();

var connection;

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(function (req,res,next){
    console.log ("entrei no primeiro middleware");
    next();
});

app.use(function (req,res,next){
    console.log ("entrei no segundo  middleware");
    next();
});

function getRoot(req,res) {
    console.log("entrei na rota / com o verbo http get");
    res.send("GET request to the homepage xxxx");
}

function postRoot(req,res){
    console.log("entrei na rota / com o verbo http post");
    res.send("POST request to homepage");   
}

function getUsers(req,res){
    console.log("entrei na rota /users com o verbo http get");
    connection.query("select name,age from utilizadores");
    res.send("{ list of users }");   
}

function postUser(req,res){
    console.log("entrei na rota /users com o verbo http post");
    res.send("POST request to users");   
    console.log ("insert into students (name, age) values ('"+req.body.username+"',"+req.body.age+")");
    connection.query("insert into students (name, age) values ('"+req.body.username+"',"+req.body.age+")");
}

app.route("/users")
    .get(getUsers)
    .post(postUser);

app.route("/")
    .get(getRoot)
    .post(postRoot);

app.get("/topic", function myFC1(req, res) {
    console.log("entrei na rota /topic com o verbo http get");
    res.send([1,2,3])
});

app.get("/topic/:id", function myFC2(req, res) {
    console.log("entrei na rota /topic/:id com o verbo http get");
    res.send([1 ])
});

app.listen (8080, function myFC3() {
        console.log("listen on port 8080");
        connection = mysql.createConnection({
         host: 'localhost',
         user: 'myappuser',
         password: 'mypass',
         database: 'test',
         port: 3306
       });
        connection.connect(function(err){
        if (err){
             console.log("failed to connect to mysql" + err.message);
        } else {
          console.log("connected to mysql in localhost port 3306");
        }
        });  
    }
);
