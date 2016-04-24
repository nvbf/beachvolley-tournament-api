import 'babel-polyfill';
const urlHost = `http://localhost:` + (process.env.PORT || 3000) ;
const debug = require('debug')('osvb:test:players');
import axios from 'axios';
import should from 'should';
axios.defaults.headers.post['Content-Type'] = 'application/json';

describe('Players Tests', () => {
  it('REST Requests ', async () => {
    const players0 = await axios.get(`${urlHost}/players`);
    players0.status.should.be.exactly(200);
    players0.data.should.be.instanceof(Array).and.have.lengthOf(0);

    const playersPost = await axios.post(`${urlHost}/players`, { name: 'testUser' });
    playersPost.status.should.be.exactly(200);

    const players1 = await axios.get(`${urlHost}/players`);
    players1.status.should.be.exactly(200);
    players1.data.should.be.instanceof(Array).and.have.lengthOf(1);

    const id = players1.data[0].id
    const thePlayer = await axios.get(`${urlHost}/players/${id}`);
    thePlayer.status.should.be.exactly(200);
    thePlayer.data.should.be.eql({ id: id, name: 'testUser' });
  });
});
