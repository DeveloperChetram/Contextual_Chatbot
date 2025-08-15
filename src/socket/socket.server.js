const {Server} = require('socket.io')
const generateResponse  = require('../services/ai.service')

function setupSocketServer(httpServer) {
    const io = new Server(httpServer, {})
        
    io.on('connection', (socket)=>{
        console.log('a user connected')


        io.on('disconnect', ()=>{
            console.log('user disconnected')
        })

        socket.on('user-message',async (data)=>{
            const response = await generateResponse(data);
            socket.emit('ai-response', response)
        })
    })
}

module.exports = setupSocketServer;