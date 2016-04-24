export const tournamentTable = 'tournament_tournaments';
export const tournamentTeamTable = 'tournament_tournaments_teams';
import {playerTable} from './players-db';
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

export function tournaments() {
  return db.query(`Select * from ${tournamentTable}`);
}

export function tournament(id) {
  return db.query("Select * from ${tournamentTable~} where id = ${id}", Object.assign({}, {id}, {tournamentTable}));
}

export function tournamentTeams(tournament_id) {
  return db.query(`Select t.player_id, t.partner_id, p.name
    from ${tournamentTeamTable} t, ${playerTable} p
    where tournament_id = $1
    and t.player_id = p.id`, tournament_id);
}

export async function createTournamentTeam(params) {
  return Promise.all([
    db.query("INSERT INTO ${tournamentTeamTable~} (tournament_id, transaction_id, player_id, partner_id) values(${tournament_id}, ${transaction_id}, ${playerId1}, ${playerId2})", Object.assign(params, {tournamentTeamTable})),
    db.query("INSERT INTO ${tournamentTeamTable~} (tournament_id, transaction_id, player_id, partner_id) values(${tournament_id}, ${transaction_id}, ${playerId2}, ${playerId1})", Object.assign(params, {tournamentTeamTable}))
  ]);
}
