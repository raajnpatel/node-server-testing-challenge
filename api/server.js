const express = require("express");

const server = express();
server.use(express.json());

let teamsArray = [{ name: "Lakers" }, { name: "Bucks" }, { name: "Clippers" }];

server.get("/", (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get("/teams", (req, res) => {
    res.status(200).json(teamsArray);
});

module.exports = server;