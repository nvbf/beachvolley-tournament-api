const express = require('express');
const app = express();

import { setupApp } from './app';

//Setup the db's if not setup.
import { initDB } from './db-init.js';
initDB();

//configure the app.
setupApp(app);


app.listen(process.env.PORT || 3000, function () {
  console.log('listening on ' + (process.env.PORT || 3000));
});
