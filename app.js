require('dotenv').config();
const axios = require('axios')
const express = require('express')
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express()

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', async (req,res) => {
    const movie = await axios.get(`http://www.omdbapi.com/?s=${req.query.s}&apikey=${process.env.API_KEY}`)
    const query = req.query.s
    res.render('index', {movie, query})
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening in port ${port}`)
})