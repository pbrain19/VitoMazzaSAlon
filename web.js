/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var express = require('express');
var app = express();
var fs = require('fs');
var sys = require('sys');
app.use(express.bodyParser({keepExtensions: true, uploadDir: '/myFiles', limit: '50mb'}));
app.use(express.static(__dirname + '/public'));


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
app.get('/', function(req, res) {

    res.render('index.html');
})