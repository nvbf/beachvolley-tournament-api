# REST API

If these docs are unclear see `tournaments-test.js` or `players-test.js` for
actual code.

# Players

## POST /players
content type: `application/json`
Required field: `name`


## GET /players
Expected Responds, a array of player-object
```
[]
[ <player-object>]
[ <player-object>, <player-object>]
....
```

## GET /player/:id
a player object:
```json
{
   "id": 1,
   "name": "Ola Nordmann"
}
```

# Tournament


## POST /tournaments
content type: `application/json`
Required field;
`name` text - the name of the tournament.
`tournament_manager` text - who is in charge.
`price` number - what does it cost to join the tournament.
`description` text - information about the tournament.
`tournament_start` dateFormat: 2016-04-24 12:00:00+02 - when does the tournament start .
`registration_start` dateFormat: 2016-04-24 12:00:00+02 - when can you first sign up for the tournament.
`allowed_teams` number - number of teams that can join the tournament.

date format for both tournament_start and registration_start is a valid postgres [datetime with timestamp](http://www.postgresql.org/docs/9.1/static/datatype-datetime.html)


## GET /tournmants/:id

The response is a tournament object:
```json
{ "id": 3,
  "name": "Name of tournament",
  "tournament_manager": "tournament_manager_value",
  "price": 200,
  "description": "info about a tournament.",
  "tournament_start": "2016-04-24T10:00:00.000Z",
  "registration_start": "2016-04-24T09:00:00.000Z",
  "status": "",
  "allowed_teams": 12,
  "teams_signed_up": 0
}

## GET /tournmants/
Expected Responds, a array of tournament-object
```
[]
[ <tournament-object> ]
[ <tournament-object>, <tournament-object>]
...
```


# TODO:

1. Create a endpoint to add persons to a tournament.
2. Add the persons to the result object
