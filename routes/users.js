var express   = require('express');
var router    = express.Router();
const bcrypt  = require('bcrypt');

const User    = require('../models/userSchema');


// Halaman Login
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Halaman login'});
});
// Halaman Register
router.get('/register', function(req, res, next) {
  res.render('register', {title:'Halaman Register'})
});

// Action Login

router.post('/login/', function(req, res) {
  const { email, password } = req.body;
  let errors = [];

  if (!email || !password ) {
    errors.push({ msg:"Silahkan lengkapi data anda" });
  }
  if (errors.length > 0) {
    res.render('login', {
      errors,
      email,
      password
    })
  } else {
    User.findOne({ email: email }).then(user=>{
      if (user) {
        if (bcrypt.compareSync(password,user.password)) {
          res.redirect('/dashboard');
        } else {
          errors.push({ msg:"Password anda tidak sama, silahkan ulangi" });
          res.render('login', {
            errors
          });
        }
      } else {
        errors.push({ msg:"Email Anda belum terdaftar" });
        res.render('login', {
          errors
        });
      }
    })
  }
});


// Action Register
router.post('/register/', function(req, res) {
    const { name, email, password, password2 } = req.body;

    let errors = [];

  if (!name || !email || !password || password2) {
    errors.push({ msg:"Silahkan lengkapi data anda" });
    console.log("Silahkan Lengkapi data anda");
  }

  if (password != password2) {
    errors.push({ msg:"Password tidak sama" });
    console.log('Password tidak sama');
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  }else{
    User.findOne({ email:email }).then(
      user => {
        if (user) {
          console.log('Email Sudah ada');
          errors.push({ msg:"Email Sudah ada" });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
          newUser.save().then(user => {
            console.log('Selamat anda berhasil registrasi, Silahkan login');
            res.redirect('/auth/login');
          }).catch(err=>console.log(err));
        }
      }
    )
  }
});
module.exports = router;
