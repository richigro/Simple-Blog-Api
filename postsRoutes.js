const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const { Post } = require('./models');

router.get("/", (req, res) => {
    res.send("hello from new endpoint posts!");
});

module.exports = router;