const express    = require('express');
const { render } = require('ejs');
const moment     = require('moment');

const router    = express.Router();
const Movie     = require('../models/movieSchema');
const {cekAuth} = require('../config/auth');

// Get All Movies
router.get('/', cekAuth, function(req, res, next){
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
router.get('/create', cekAuth, function(req, res, next) {
    res.render('movie/createMovies',{
        title:'Create Movies'
    })
});

//Update Movie
router.get('/update/:movieId', cekAuth, function(req, res, next) {

    Movie.findById(req.params.movieId, function(err, movieInfo){
        const newDate = moment(movieInfo.release_on).format("YYYY-MM-DD");
        if (movieInfo) {
            console.log(movieInfo);
            res.render('movie/updateMovies', {
                movies : movieInfo,
                newDate
            })
        }
    })
});

//Action create
router.post('/create', cekAuth, function(req, res){
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

//Action Update , jika menggunakan API menggunakan put jika tidak menggunakan API gunakan post
router.post('/update', cekAuth, function(req, res){
    let errors = [];

    Movie.findByIdAndUpdate(req.body.id,{name:req.body.name, release_on: req.body.date}, function(err){
        if (err) {
            console.log(err);
        } else {
            errors.push({msg:'Data Berhasil terupdate'});
            const newMovies = {_id:req.body.id, name:req.body.name};
            const newDate   = moment(req.body.date).format("YYYY-MM-DD");
            res.render('movie/updateMovies', {
                movies : newMovies,
                newDate,
                errors
            })
        }
    })
});

//Action Delete jika menggunakan API menggunakan delete jika tidak menggunakan API gunakan get
router.get('/delete/:movieId', cekAuth, function(req, res){
   Movie.findByIdAndDelete(req.params.movieId, function(){
       res.redirect('/movies');
   });
});


module.exports = router;