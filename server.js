const app = require('./src/app')
const setupSocketServer = require('./src/socket/socket.server')
const http = require('http')


const httpServer = http.createServer(app)
const connectDB = require('./src/db/db')
setupSocketServer(httpServer)
connectDB();


httpServer.listen(3000, ()=>{
    console.log('server is running 3000')
})