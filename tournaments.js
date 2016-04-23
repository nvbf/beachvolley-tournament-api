const express = require('express');
const app = express();
const debug = require('debug')('osvb:tournaments');

import { tournament, tournaments, createTournament } from './tournaments-db';

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get('/tournaments', function (req, res) {
    const p = tournaments();
    console.log('/tournaments',  p);
    p.then(tournaments => res.send(tournaments));
    p.catch(err => errorMessage(res, err));
});

app.get('/tournaments/:id', function (req, res) {
    const p = tournament(req.params.id);
    p.then(tournament => res.send(tournament[0]));
    p.catch(err => errorMessage(res, err));
});

app.post('/tournaments', function (req, res) {
  const params = JSON.parse(JSON.stringify(req.body));
  debug('params', params);
  const p = createTournament(params);
    p.then(result => {
      debug(result);
      res.json(`{
        'status': 'ok',
        'message': ${params.name} added as a tournament,
        'id': ${result.id}
      }`);
    });
    p.catch(err => errorMessage(res, err));
});

function errorMessage(res, err) {
  res.status(500).send({
    'status': 'error',
    'message': 'Internal server error',
    'details': JSON.stringify(err)
  });
}

module.exports = app;
