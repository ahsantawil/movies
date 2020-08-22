const express   = require('express');
const { render } = require('ejs');

const router    = express.Router();

// Get All Movies
router.get('/', function(req, res, next){
    res.render('movie/allMovies', {
        title:'Get Movies'
    })
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

});

//Action Update
router.put('/update/movieId', function(req, res){

});

//Action Delete
router.delete('/delete/:movieId', function(req, res){

});


module.exports = router;