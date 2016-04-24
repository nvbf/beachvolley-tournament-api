import 'babel-polyfill';
const urlHost = `http://localhost:` + (process.env.PORT || 3000) ;
const debug = require('debug')('osvb:test:tournament:add-players');
import axios from 'axios';
import should from 'should';
axios.defaults.headers.post['Content-Type'] = 'application/json';
import { mochaAsync } from './testHelpers';

const tournamentObject = {
  name: 'Name of tournament',
  tournament_manager: 'tournament_manager_value',
  price: 200,
  description: 'info about a tournament.',
  tournament_start: '2016-04-24 12:00:00+02',
  registration_start: '2016-04-24 11:00:00+02',
  'allowed_teams': 12
}

const timeInZuluTime = {
  tournament_start: '2016-04-24T10:00:00.000Z',
  registration_start: '2016-04-24T09:00:00.000Z',
}

const defaultValues = {
  status: '',
  teams_signed_up: 0
}

describe('Add Players to Tournament Tests', function() {
  it('REST Requests ',
    mochaAsync(async function() {
      //before
      const verifyTournament = await axios.get(`${urlHost}/tournaments`);
      const tournamentId = verifyTournament.data[0].id;
      const playersPost = await axios.post(`${urlHost}/players`, { name: 'testUser2' });
      const players = await axios.get(`${urlHost}/players`);
      debug('!!!!!!!!!!!', players.data);
      const playerId1 = players.data[0].id;
      const playerId2 = players.data[1].id;
      //before end
      debug('TRY POST', `${urlHost}/tournaments/${tournamentId}/teams/${playerId1}/${playerId2}`);
      try {
        const addTeamResultP = await axios.post(`${urlHost}/tournaments/${tournamentId}/teams/${playerId1}/${playerId2}`, {
          "transaction_id" : ""
        });
        // addTeamResultP.then(aSpecifyTournament => aSpecifyTournament.status.should.be.exactly(200))
        // addTeamResultP.catch(b => debug('ERROR!!!:::::', b));


        debug('TRY GET', `${urlHost}/tournaments/${tournamentId}/teams}`);
        const teams = await axios.get(`${urlHost}/tournaments/${tournamentId}/teams}`);
        teams[0].shoud.be.eql([{"id": playerId2, "name": "testUser"}, {"id": playerId1, name: "testUser2"}])
      } catch(e) {
        throw e;
      }
    })
  );
});
