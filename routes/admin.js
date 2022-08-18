const express = require("express");
const { getUserData, editUSer, getOneUser, searchUser, deleteUser, signup, login } = require("../helpers/adminHelper");
const router = express.Router()




function checkLogin(req, res, next) {
    if (req.session?.admin?.adminLogedin) {
        res.setHeader('Cache-Control', 'private,no-cache,no-store,must-revadilate')
        next()
    } else {
        res.redirect('/admin/login');
        next();
    }
}


router.get('/', checkLogin, (req, res) => {
    getUserData().then((result) => {
        res.render('admin', { admin: true, logedin: true, data: result })
    })
});
router.get('/login', (req, res) => {
    if (req.session.admin?.adminLogedin) {
        res.redirect('/admin')
    } else {
        res.render('forms/adminlogin');
    }
})
router.post('/login', (req, res) => {
    login(req.body).then(result => {
        req.session.admin = result
        req.session.admin.adminLogedin = true;
        res.status(200).json(result)
    }).catch(result => {
        res.status(200).json(result)
    })
})
router.get('/signup', (req, res) => {
    if (req.session.admin?.adminLogedin) {
        res.redirect('/admin')
    } else {
        res.render('forms/signupadmin');
    }
})
router.post('/signup', (req, res) => {
    signup(req.body).then(result => {
        res.status(201).json(result)
    }).catch(result => {
        res.status(201).json(result)
    })
})
router.get('/edit/:_id', (req, res) => {
    const { _id } = req.params
    getOneUser(_id).then(result => {
        res.render('forms/edituser', { result })
    })
})
router.put('/submit', (req, res) => {
    editUSer(req.body).then(result => {
        res.status(204).json(result);
    }).catch(result => {
        res.status(409).json(result);
    })
})
router.get('/search/:search', (req, res) => {
    searchUser(req.params.search).then((result) => {
        res.status(200).json(result);
    })
})
router.delete('/delete', (req, res) => {
    deleteUser(req.body._id).then((result) => {
        res.status(200).json(result)
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/admin/login')
})
module.exports = router;