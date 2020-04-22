const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const request = require('request');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/event/search', (req, res) => {
    let keywords = req.query.keywords;
    keywords = keywords.replace(/ /g, "+%7C%7C+");
    res.setHeader('Content-Type', 'application/json');
    request(
        { url: `http://api.eventful.com/json/events/search?app_key=V8w6JvwNxm4VCX5H&l=Boston&q=%28${keywords}%29` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

app.get('/api/searchbyid', (req, res) => {
    const id = req.query.id || 'USA';
    res.setHeader('Content-Type', 'application/json');
    request(
        { url: `http://api.eventful.com/json/events/get?app_key=V8w6JvwNxm4VCX5H&id=${id}` },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

// app.listen(process.env.PORT || 5000);
app.listen(3001);
