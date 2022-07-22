const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


let numOfUsers = -1;

app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', (socket)=>{

    numOfUsers+=1;
    console.log(numOfUsers+" users connected")
    socket.on('disconnect', ()=>{
        numOfUsers-=1;
        console.log(numOfUsers+" connected")
    })
    socket.on('message', (msg)=>{
        io.emit('message', msg)
    })
   
})

const port = process.env.PORT || 5000

server.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
});
