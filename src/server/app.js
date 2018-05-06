const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    user: '',
    password: '',
    database: 'fitit'
});

const app = express();

app.use('/', express.static('build'));

app.use(bodyParser.json({
    limit: '2mb'
}));

const port = 4000;

app.post('/submit', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    client.connect();

    const insert = 'INSERT INTO activity_details (name, activitytype, kilometer) VALUES ($1, $2, $3) RETURNING id';
    client.query(insert, [req.body.name, req.body.activityType, req.body.km], (err, res) => {
        console.log(err ? err.stack : res.rows[0].id);
        client.end()
    });

    res.send(JSON.stringify({status: 'success'}));
});

app.listen(port, () => console.log(`Server running on port ${port}`));