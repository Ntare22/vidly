const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

const genres = [{
  id: 1,
  genre: "horror"
},
{
  id: 2,
  genre: "comedy"
},
{
  id: 3,
  genre: "thriller"
}]

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().min(3).max(15).required()
  }
  return Joi.validate(genre, schema)
}


app.get('/', (req, res) => {
  res.send('Grinding all my life is my favorite song')
})

app.get('/api/genres', (req, res) => {
  res.status(200).json(genres);
})

app.get('/api/genres/:id', (req, res) => {
  const genreId = parseInt(req.params.id);
  const genre = genres.find(g => g.id === genreId);
  if (!genre) res.status(404).send('The genre with the given id is not available')
  res.json(genre)
})

app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newGenre = {
    id: genres.length + 1,
    genre: req.body.name
  }

  genres.push(newGenre)
  res.status(200).send(genres)
})

app.put('/api/genres/:id', (req, res) => {
  const { error } = validateGenre(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genreId = parseInt(req.params.id);
  const updatedGenre = genres.find(g => g.id === genreId);

  updatedGenre.genre = req.body.name;
  res.json(updatedGenre);
})

app.delete('/api/genres/:id', (req, res) => {
  const genreId = parseInt(req.params.id);
  const genre = genres.find(g => g.id === genreId);
  if (!genre) res.status(404).send('The genre with the given id is not available')

  const index = genres.indexOf(genre)
  genres.splice(index, 1);
  res.json(genre);
})

app.listen(3000, () => {
  return console.log('listening on port 3000')
});
