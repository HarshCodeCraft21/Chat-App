const Express = require('express');
const App = Express();

const http = require('http').createServer(App);
const PORT = process.env.PORT || 3000;

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})
App.use(Express.static(__dirname + '/public'))

App.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})


//setup socket.io

const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('connected.....');

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})