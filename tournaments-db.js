export const tournamentTable = 'tournament_tournaments';
import {db} from './db-init';
const debug = require('debug')('osvb:tournaments:db');

export async function createTournament(params) {
  try{
    return await db.query("INSERT INTO ${tournamentTable~}" +
    "(name, tournament_manager, price, description, tournament_start, registration_start, allowed_teams)" +
    "values(${name}, ${tournament_manager}, ${price}, ${description}, ${tournament_start}, ${registration_start}, ${allowed_teams}) RETURNING id", Object.assign(params, {tournamentTable}));
  } catch(e) {
    debug('ERROR:createTournament ', e);
    return;
  }
}

export async function tournaments() {
  try{
    const tournaments = await db.query(`Select * from ${tournamentTable}`);
    debug(tournaments);
    return tournaments;
  } catch(e) {
    debug('ERROR:tournaments ', e);
    return;
  }
}

export async function tournament(id) {
  try{
    return await db.query("Select * from ${tournamentTable~} where id = ${id}", Object.assign({}, {id}, {tournamentTable}));
  } catch(e) {
    debug('ERROR:tournament/:id ', e);
    return;
  }
}
