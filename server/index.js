// require express
const express = require('express');

// require cors 
const cors = require("cors");

// instanciate app with express to create server
const app  = express();

// require an instanciate http to work with sockets
const http = require("http");

// require socket.io lib
const {Server} = require('socket.io');

// use cors
app.use(cors)

// create server
const server = http.createServer(app);

// instanciate io and configure cors
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3001"
    }
});

// listening our socket events
io.on("connection",(socket)=>{

    // new user get connected
    console.log("user id: ",socket.id);

    // Handle vote action
    socket.on("refresh",(data)=>{
        // Broadcast new result
        socket.broadcast.emit("new_result",data);
    });

});

// set server port
server.listen("3002",()=>{
    console.log("Server is running, Happy coding ^^ ");
});