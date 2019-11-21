const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));



const apps = require('./playstore.js');

app.get('/apps', (req, res) => {

    const { genres, sort } = req.query;

    const returnError = (text) => {
        return res
            .status(400)
            .send(text);
    }

    if (genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            returnError('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card');
        }
    }

    if (sort) {
        if(!['Rating', 'App'].includes(sort)) {
            returnError('Sort must be one of Rating or Apps');
        }
    }

    let results = genres
                  ? apps.filter(app => 
                        app
                        .Genres
                        .toLowerCase()
                        .includes(genres.toLowerCase())
                    ) 
                  : apps
    
    if (sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? -1 : a[sort] < b[sort] ? 1 : 0;
            });
    }

    res
        .json(results);
});

module.exports = app;