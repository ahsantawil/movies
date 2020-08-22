const express    = require('express');
const { render } = require('ejs');

const router    = express.Router();
const Movie     = require('../models/movieSchema');

// Get All Movies
router.get('/', function(req, res, next){
    let listMovies = [];
    Movie.find(function(err, movies){
        if (movies) {
            for (let data of movies) {
                listMovies.push({
                    id: data._id,
                    name : data.name,
                    release_on:data.release_on
                });
            }
            res.render('movie/allMovies',{listMovies});
            } else{
                listMovies.push({
                    id:'',
                    name:'',
                    release_on:''
                });
                res.render('movie/allMovies',{listMovies});
            }
    });
});

// Create Movies
router.get('/create', function(req, res, next) {
    res.render('movie/createMovies',{
        title:'Create Movies'
    })
});

//Update Movie
router.get('/update/:movieId', function(req, res, next) {
    res,render('movie/updateMovies', {
        title:'Update Movies',
        movieId:req.params.movieId
    })
});

//Action create
router.post('/create', function(req, res){
    const {name, date} = req.body;
    
    let errors = [];
    if (!name || !date) {
        errors.push({msg:'Silahkan lengkapi data yang dibutuhkan'});
    }
    if (errors.length > 0) {
        res.render('movie/createMovies', {errors});
    } else {
        const movie = Movie({
            name,
            release_on : date
        });
        movie.save().then(movie => {
            errors.push({msg:'Data movie berhasil ditambah'});
            res.render('movie/createMovies',{errors});
            }
        ).catch(err=>console.log(err));
    }
});

//Action Update
router.put('/update/movieId', function(req, res){

});

//Action Delete
router.delete('/delete/:movieId', function(req, res){

});


module.exports = router;