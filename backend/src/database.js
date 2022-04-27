const mongoose = require('mongoose');
require('dotenv').config()

const connectionString=process.env.DB_STRING

if (process.env.NODE_ENV==='production'){
  connectionString=process.env.DB_STRING_PROD
}
mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Db connected"))
    .catch(err=> console.log(err));
