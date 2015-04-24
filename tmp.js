// Require the stuff we need
var express = require("express");
var logger = require("morgan");
var http = require("http");

// Build the app
var app = express();

app.use(logger());

app.use(function(request, response, next) {
   console.log("In come with: " + request.method + "url: " + request.url); 
   next();
});

// Add some middleware
app.use(function(request, response) {
      response.writeHead(200, { "Content-Type": "text/plain" });
        console.log("This is 'Hello world' middleware");
        response.end("Hello world!\n");
});

// Start it up!
app.listen(1337);
app.set('port', 1337);
console.log("Now server is listening to port: " + app.get('port'));
