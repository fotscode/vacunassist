const express = require('express');
const cors = require('cors')
const path=require('path')
const passport=require('passport')
const app = express();

require('dotenv').config()
require('./config/database')
require('./config/passport')(passport)

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.static(path.join(__dirname,'public')))

app.use("/api",require('./routes'));
const port=3000;
app.listen(port);
console.log(`Server on port ${port}`);
