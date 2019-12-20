const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users_model.js');
const restricted = require('../api/restricted-middleware');

router.post("/register", (req, res) => {
    let { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    Users.add({ username, password: hash })
        .then(saved => {
            res
                .status(201)
                .json(saved);
        })
        .catch(error => {
            res
                .status(500)
                .json(error);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res
                    .status(200)
                    .json({ message: `Welcome ${user.username}!` });
            } else {
                res
                    .status(401)
                    .json({ message: "You.. shall not.. pass!" });
            }
        })
        .catch(error => {
            res
                .status(500)
                .json(error);
        });
});

router.get("/users", restricted, (req, res) => {
    Users.find()
        .then(users => {
            res
                .json(users);
        })
        .catch(error => {
            res
                .status(500)
                .send(error)
        });
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(error => {
            if (error) {
                res
                    .status(401)
                    .json({errorMessage: "No User to Logout."})
            } else {
                res
                    .status(200)
                    .json({message: "You've been logged out."})
            }
        });
    }
});


module.exports = router;
