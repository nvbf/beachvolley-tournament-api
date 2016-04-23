export const tournamentTable = 'tournament_tournaments';

import {db} from './db-init';

export async function createTournament(name) {
  try{
    await db.query(`INSERT INTO ${tournamentTable}(name) values($1)`, name);
  } catch(e) {
    console.log('ERROR: ', e);
    return [];
  }
}

export async function tournaments() {
  try{
    const tournaments = await db.query("Select * from ${tournamentTable}");
    console.log(tournaments);
    return tournaments;
  } catch(e) {
    console.log('ERROR: ', e);
    return [];
  }
}

export async function tournament(id) {
  try{
    return await db.query(`Select * from ${tournamentTable} where id = $1`, id);
  } catch(e) {
    console.log('ERROR: ', e);
    return [];
  }
}
