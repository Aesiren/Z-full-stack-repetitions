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

app.get('/movies/:id', (req, res) => {
  knex('movies')
    .select('*')
    .from('favorites')
    .where("id", req.params.id)
    .then(data => {
      res.status(200).json(data);
    })
})

app.post('/movies/new', async (req, res) => {
  let newData = req.body;
  console.log(req.body)
  try {
    await knex('favorites').insert(newData);
    res.status(200).json({ message: "saved favorite information" });
    console.log("new product saved");
  } catch (err) {
    console.error('error saving data: ', err)
    res.status(500).json({ error: "Failed to post data" })
  }
})

app.patch('/movies/update/:id', async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    await knex('favorites').where('id', id).update(data);
    res.status(200).json({ message: 'Update saved' });
    console.log(`Saved and update to ${id}`);
  } catch (err) {
    console.error('Error during operation: ', err);
    res.status(500).json({ error: 'Failed to update data' });
  }
})

app.delete('/movies/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await knex('favorites').where('id', id).del();
    console.log('Deleted item');
    res.status(200).json({ message: "Item deleted" });
  } catch (err) {
    console.error("Error during operation: ", err);
    res.status(500).json({ error: "Failed to delete" });
  }
})

module.exports = app;