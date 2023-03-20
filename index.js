const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParse = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const authorRoute = require('./routes/author')
const bookRoute = require('./routes/book')


dotenv.config()
mongoose.set('strictQuery', false)
// CONNECT DB
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log('connect MongoDB ')
})

app.use(bodyParse.json({ limit: '50mb' }))
app.use(cors())
app.use(morgan('common'))
// đống này bỏ dưới router là nó bị lỗi :vv , 
// chương trình chạy từ trên xuống dưới

//router 
app.use('/v1/author', authorRoute)
app.use('/v1/book', bookRoute)

app.listen(8080, () => {
    console.log('server is running ....')
})

