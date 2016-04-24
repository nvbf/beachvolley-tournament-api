export const playerTable = 'tournament_players';
const debug = require('debug')('osvb:players:db');
import {db} from './db-init';

//TODO: is this the smartes way to recover from a mistake in the db? return [] ???? Lets faile hard instead.

export async function createPlayer(name) {
  try{
    await db.query(`INSERT INTO ${playerTable}(name) values($1)`, name);
  } catch(e) {
    debug('createPlayer ERROR: ', e);
    return [];
  }
}

export async function players() {
  try{
    const players = await db.query(`Select * from ${playerTable}`);
    return players;
  } catch(e) {
    debug('players ERROR: ', e);
    return [];
  }
}

export async function player(id) {
  try{
    return await db.query(`Select * from ${playerTable} where id = $1`, id);
  } catch(e) {
    debug('player ERROR: ', e);
    return [];
  }
}
