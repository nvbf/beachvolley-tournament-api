const pgp = require('pg-promise')();

const cn = process.env.DATABASE_URL || process.env.DATABASE_URL_TEST ||"postgres://tournament:tournament@localhost:5432/tournament";
export const db = pgp(cn);
import {playerTable} from './players-db';
import {tournamentTable, tournamentTeamTable} from './tournaments-db';

export async function initDB() {
  try{
    const resultPlayers = await db.query(`Select * from information_schema.tables where table_name LIKE '${playerTable}'`);
    if(resultPlayers.length === 0) {
      await db.query(`CREATE TABLE ${playerTable} (
        id SERIAL PRIMARY KEY,
        name text
      )`);
    } else {
      console.log(`${playerTable} exists`);
    }

    const resultTournament = await db.query(`Select * from information_schema.tables where table_name LIKE '${tournamentTable}'`);
    if(resultTournament.length === 0) {
      await db.query(`CREATE TABLE ${tournamentTable} (
        id SERIAL PRIMARY KEY,
        name text,
        tournament_manager text,
        price integer,
        description text,
        tournament_start timestamptz,
        registration_start timestamptz,
        status text default '',
        allowed_teams integer,
        teams_signed_up integer default 0
      )`);
    } else {
      console.log(`${tournamentTable} exists`);
    }

    const resultTournamentTeam = await db.query(`Select * from information_schema.tables where table_name LIKE '${tournamentTeamTable}'`);
    if(resultTournamentTeam.length === 0) {
      await db.query(`CREATE TABLE ${tournamentTeamTable} (
        id SERIAL PRIMARY KEY,
        tournament_id integer references ${tournamentTable}(id),
        transaction_id text,
        player_id integer references ${playerTable}(id),
        partner_id integer references ${playerTable}(id)
      )`);
    } else {
      console.log(`${tournamentTeamTable} exists`);
    }

  } catch(e) {
    console.log('ERROR initDB: ', e);
  }
}

export async function truncateTables() {
  try{
    await db.query(`truncate table ${playerTable} CASCADE`);
    await db.query(`truncate table ${tournamentTable} CASCADE`);
  } catch(e) {
    console.log('truncateTables: ', e);
  }
}
