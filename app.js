const express = require ('express');
const path = require('path');


const app = express ();

/**
 * Middlewares
 */


/**
 * View setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/**
 * Configure routes
 */
const router = require('./config/routes.config');
app.use('/', router);



const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Ready! Listening on port ${port}`);
});