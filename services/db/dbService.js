const mongoose = require('mongoose');
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.45ghl.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    autoCreate: true,
    maxPoolSize: 5,
}).then(()=>{
    console.log('Connected to DB');
}).catch(err => console.error("Error connecting to db",err));

module.exports = mongoose;