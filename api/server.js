const express = require("express");

const server = express();
server.use(express.json());

let teamArray = [{ team: "Lakers" }, { team: "Clippers" }, { team: "Bucks" }];

server.get("/", (req, res) => {
    res
        .status(200)
        .json({ api: "up" });
});

server.get("/teams", (req, res) => {
    res
        .status(200)
        .json(teamArray);
});

server.post("/teams", (req, res) => {
    if (req.body.team) {
        teamArray.push(req.body);
        res
            .status(201)
            .json({ message: "Team was added", team: req.body });
    } else {
        res
            .status(401)
            .json({ message: "No data was detected" });
    }
});

server.delete("/teams", (req, res) => {
    if (req.body.team) {
        teamArray = teamArray.filter(del => del.team !== req.body.team);
        res
            .status(201)
            .json({ message: "Team was deleted", team: req.body });
    } else {
        res
            .status(401)
            .json({ message: "No data was detected" });
    }
});

module.exports = server;