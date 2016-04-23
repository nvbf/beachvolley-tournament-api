import 'babel-polyfill';
const urlHost = `http://localhost:` + (process.env.PORT || 3000) ;
const debug = require('debug')('osvb:test:tournament');
import axios from 'axios';
import should from 'should';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const mochaAsync = (fn) => {
    return async (done) => {
        try {
            await fn();
            done();
        } catch (err) {
            done(err);
        }
    };
};


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

describe('Tournaments Tests', function() {
  it('REST Requests ',
    mochaAsync(async () => {
      const firstTournament = await axios.get(`${urlHost}/tournaments`);
      firstTournament.status.should.be.exactly(200);
      firstTournament.data.should.be.instanceof(Array).and.have.lengthOf(0);

      const tournamentPost = await axios.post(`${urlHost}/tournaments`, tournamentObject);
      tournamentPost.status.should.be.exactly(200);

      const verifyTournament = await axios.get(`${urlHost}/tournaments`);
      verifyTournament.status.should.be.exactly(200);
      verifyTournament.data.should.be.instanceof(Array).and.have.lengthOf(1);

      const id = verifyTournament.data[0].id
      const aSpecifyTournament = await axios.get(`${urlHost}/tournaments/${id}`);
      aSpecifyTournament.status.should.be.exactly(200);
      aSpecifyTournament.data.should.be.eql(Object.assign({}, tournamentObject, {id}, timeInZuluTime, defaultValues));
    })
  );
});
