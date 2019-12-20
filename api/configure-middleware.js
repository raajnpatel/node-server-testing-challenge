const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);
const knex = require('../database/db');

const sessionsConfig = {
  // sessions storage options
  secret: 'Secrets', // used for encryption (must be an environtment variable
  name: 'Cookie Monster', // default would be sid
  resave: false,
  saveUninitialized: true, // true during development, false for production

  // how to store the sessions
  store: new KnexSessionStore({
    // DO NOT FORGET THE NEW KEYWORD
    knex, // imported from dbConfig.js
    createtable: true,
    clearInterval: 60000,
    tablename: 'sessions',
    sidfieldname: "sid"
  }),

  // cookie options
  cookie: {
    maxAge:600000, // 1000 (second) * 60 (minute) * 60 (hour) TIME IN MILLISECONDS
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true
  }
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors({origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  }));
  server.use(sessions(sessionsConfig));
};
