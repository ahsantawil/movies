const mongoose  = require('mongoose');

// const mongodb   = 'mongodb://127.0.0.1:27017/movies';
const mongodb   = 'mongodb+srv://MoviesApp:Babakan01@moviesapp.oi3sy.mongodb.net/MoviesApp?retryWrites=true&w=majority';

mongoose.connect(mongodb,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
).then(()=>console.log('Mongodb Connected'));


mongoose.Promise = global.Promise;

module.exports = mongoose;