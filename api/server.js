const express = require('express');

const userRouter = require('../routes/users_router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', userRouter);

server.get('/', (req, res) => {
    res
        .status(200)
        .json({ api: "It seems you've made your way inside." });
});

server.get('/api', (req, res) => {
    res
        .status(200)
        .json({ api: "You're getting closer." });
});

module.exports = server;
