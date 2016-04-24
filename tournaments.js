const express = require('express');
const app = express();
const debug = require('debug')('osvb:tournaments');

import { tournament, tournaments, createTournament, tournamentTeams, createTournamentTeam } from './tournaments-db';

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies

app.get('/tournaments', function (req, res) {
    const p = tournaments();
    p.then(tournaments => res.send(tournaments));
    p.catch(err => errorMessage(res, err));
});

app.get('/tournaments/:id', function (req, res) {
    const p = tournament(req.params.id);
    p.then(tournament => res.send(tournament[0]));
    p.catch(err => errorMessage(res, err));
});

app.get('/tournaments/:id/teams', function (req, res) {
    const p = tournamentTeams(req.params.id);
    p.then(teams => res.json(transformFromDBtoApiStructur(teams)));
    p.catch(err => errorMessage(res, err));
});

app.post('/tournaments/:id/teams/:playerId1/:playerId2', function (req, res) {
  const playerId1 = req.params.playerId1;
  const playerId2 = req.params.playerId2;
  const tournament_id = req.params.id;
  const params = JSON.parse(JSON.stringify(req.body));
  const p = createTournamentTeam(Object.assign({}, {tournament_id} ,{playerId1}, {playerId2}, params));
  p.then(result => {
    res.json(`{
      'status': 'ok',
      'message': 'Team added to tournament',
    }`);
  });
  p.catch(err => errorMessage(res, err));
});

app.post('/tournaments', function (req, res) {
  const params = JSON.parse(JSON.stringify(req.body));
  const p = createTournament(params);
    p.then(result => {
      res.json(`{
        'status': 'ok',
        'message': '${params.name} added as a tournament',
        'id': ${result.id}
      }`);
    });
    p.catch(err => errorMessage(res, err));
});

function errorMessage(res, err) {
  debug('errorMessage;', err, err.message, err.fileName, err.lineNumber);
  debug('errorMessage0;', err[0]);
  res.status(500).send({
    'status': 'error',
    'message': 'Internal server error',
    'details': JSON.stringify(err)
  });
}

/**
  * input: [ { player_id: 109, partner_id: 108, name: 'testUser2' },
  *         { player_id: 108, partner_id: 109, name: 'testUser' } ]
  * output: [ [ {id: 109, name: testUser2}, {id: 108, name: testUser}]]
  */
function transformFromDBtoApiStructur(teams) {
  return teams.reduce((acc, cur) => {
    //find team that the player belongs to.
    const teamIndex = acc.findIndex(elem => {
      return elem[1].id === cur.player_id;
    });

    if(teamIndex === -1) {
      acc.push([{ id:cur.player_id, name: cur.name}, {id: cur.partner_id}]);
      return acc;
    }
    // exist, but missing name. lets inject the name.
     acc[teamIndex][1] = Object.assign(acc[teamIndex][1], {name: cur.name})
     return acc;
  }, []);
}

module.exports = app;
