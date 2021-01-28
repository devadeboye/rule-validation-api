const mongoose = require('mongoose');

const db = mongoose.connect(
    `${process.env.MONGO_URI}`,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        autoIndex: false
    }
).then(response => {
    console.log("connected to mongo db");
})
.catch(error => console.log(error))


module.exports = { db }
