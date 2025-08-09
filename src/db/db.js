const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('db is connected')
    })
}

module.exports = connectDB