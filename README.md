#players

## POST /players
content type: `application/json`
Required field: `name`


## GET /players


## GET /player/:id


# Tournament


## POST /tournaments
content type: `application/json`
Required field;
`name` text - the name of the tournament.
`tournament_manager` text - who is in charge.
`price` number - what does it cost to join the tournament.
`description` text - information about the tournament.
`tournament_start` dateFormat: ??? - when does the tournament start .
`registration_start` dateFormat: ??? - when can you first sign up for the tournament.
`allowed_teams` number - number of teams that can join the tournament.
