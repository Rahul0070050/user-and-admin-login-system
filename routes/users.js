var express = require('express');
const { login, signup } = require('../helpers/userHelper');
var router = express.Router();

const user = {
  logedin: false,
  admin: false,
  success: false,
  data: null
}

function checkLogin(req, res, next) {
  if (req.session.user?.logedin) {
    res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
    next();
  } else {
    res.redirect('/user/login');
    next();
  }
}



/* GET users listing. */
router.get('/', checkLogin, function (req, res) {
  res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
  res.render('user', { admin: false, logedin: true, user: req.session.user })
});

router.get('/login', (req, res) => {
  if (req.session.user?.logedin) {
    res.redirect('/')
  } else {
    res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
    res.render('forms/userlogin');
  }
});

router.get('/signup', (req, res) => {
    res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
    res.render('forms/signupuser')
})

router.post('/login', (req, res) => {
  login(req.body).then((result) => {
    req.session.user = result.data;
    req.session.user.logedin = true;
    user.data = result.data;
    user.logedin = true;
    user.admin = true;
    user.success = result.success;
    res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
    res.status(200).json(user)
  }).catch((err) => {
    res.status(200).json(err)
  })
})

router.post('/signup', (req, res) => {
  signup(req.body).then((result) => {
    req.session.user = result;
    user.data = result
    user.logedin = true
    user.admin = true
    user.success = true
    res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')

    res.status(201).json(user)
  }).catch((err) => {
    res.json({ msg: err, success: false })
  })
})



router.get('/logout', (req, res) => {
  req.session.destroy();
  user.logedin = false
  user.admin = false
  user.success = false
  user.data = null
  res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
  res.redirect('/user/login');
})


module.exports = router;
