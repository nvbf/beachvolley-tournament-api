export const playerTable = 'tournament_players';

import {db} from './db-init';

export async function createPlayer(name) {
  try{
    await db.query(`INSERT INTO ${playerTable}(name) values($1)`, name);
  } catch(e) {
    console.log('ERROR: ', e);
    return [];
  }
}

export async function players() {
  try{
    const players = await db.query(`Select * from ${playerTable}`);
    console.log(players);
    return players;
  } catch(e) {
    console.log('ERROR: ', e);
    return [];
  }
}

export async function player(id) {
  try{
    return await db.query(`Select * from ${playerTable} where id = $1`, id);
  } catch(e) {
    console.log('ERROR: ', e);
    return [];
  }
}
