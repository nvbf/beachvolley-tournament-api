// Configure and setup the  express app. Used in both index.js and test.js
export function setupApp(app) {

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  const playersApp = require('./players');
  app.use('/', playersApp);

  const tournamentApp = require('./tournaments');
  app.use('/', tournamentApp);
}
