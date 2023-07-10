const express = require("express");
var appForBookRouter = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'SDM'

});

connection.connect();
appForBookRouter.get("", (request, response) => {

    var query = `select * from Book_tb `;
    connection.query( query, (error, result) => {
        if (error == null) {
            var data = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            response.write(data);
        }
        else {
            console.log(error);
            response.setHeader("Content-Type", "application/json");
            response.write(error);
        }
        response.end();
    })
})


appForBookRouter.put("/:id", (request, response) => {
    var query =
        `update Book_tb set price = '${request.body.price}',language = '${request.body.language}' where id=${request.params.id}`;

                connection.query(query, (error, result) => {

                    if (error == null) {
                        var data = JSON.stringify(result);
                        response.setHeader("Content-Type", "application/json");
                        response.write(data);
                    }
                    else {
                        console.log(error);
                        response.setHeader("Content-Type", "application/json");
                        response.write(error);
                    }
                    response.end();
    })
})

appForBookRouter.post("/", (request, response) => {
    var query =
        `INSERT INTO Book_tb (b_name, author,book_type,price,publishedDate,language) VALUES ( '${request.body.b_name}','${request.body.author}','${request.body.book_type}','${request.body.price}','${request.body.publishedDate}','${request.body.language}')`;

                connection.query(query, (error, result) => {

                    if (error == null) {
                        var data = JSON.stringify(result);
                        response.setHeader("Content-Type", "application/json");
                        response.write(data);
                    }
                    else {
                        console.log(error);
                        response.setHeader("Content-Type", "application/json");
                        response.write(error);
                    }
                    response.end();
    })
})

appForBookRouter.delete("/:id",(request,response)=>{
    var query = `delete from Book_tb where id = ${request.params.id}`;

    connection.query(query, (error, result) => {

        if (error == null) {
            var data = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            response.write(data);
        }
        else {
            console.log(error);
            response.setHeader("Content-Type", "application/json");
            response.write(error);
        }
        response.end();
})
})


module.exports = appForBookRouter;
