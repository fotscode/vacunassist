const express = require('express')
const morgan = require('morgan')
const cors=require('cors')
const path=require('path')
require('dotenv').config()
const app = express()
app.set('port',process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/admin',require('./routes/admin.routes'))

module.exports = app
