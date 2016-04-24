const express = require('express');
const app = express();

import { players, player, createPlayer } from './players-db.js';

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get('/players', function (req, res) {
    const p = players();
    p.then(players => res.send(players));
});

app.get('/players/:id', function (req, res) {
    const p = player(req.params.id);
    p.then(player => res.send(player[0]));
});



app.post('/players', function (req, res) {
  const params = JSON.parse(JSON.stringify(req.body));
    if(!params.name) {
      return res.status(422).send({
        'status': 'error',
        'message': 'mandatory parameter "name" must exists'
      });
    }
    const p = createPlayer(params.name);
    p.then(result => {
      res.json(`{
        'status': 'ok',
        'message': ${params.name} added as a player
      }`);
    });
    p.catch(err => {
      res.status(500).send({
        'status': 'error',
        'message': 'Internal server error',
        'details': JSON.stringify(err)
      });
    })
});


module.exports = app;
