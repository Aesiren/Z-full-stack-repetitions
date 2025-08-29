const express = require('express');
const cors = require('cors');
const app = express();

const port = 8080;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(cors());
app.use(express.json());

(async () => {
  try {
    console.log('Setting up DB')
    await knex.migrate.latest();
    console.log('Seeding database');
    await knex.seed.run();

    app.listen(port, () => {
      console.log('Server listening on port ', port);
    })
  } catch (err) {
    console.error('Database setup failed: ', err)
  }
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server running' });
})

app.get('/movies', (req, res) => {
  knex('movies')
    .select('*')
    .from('favorites')
    .then(data => {
      res.status(200).json(data);
    })
})

module.exports = app;