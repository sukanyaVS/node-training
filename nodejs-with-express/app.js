const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf8'));

app.get('/', (req, res) => {
  res.status(200).send('Hello from Express!');
});

app.get('/users', (req, res) => {
  res.status(200).json({ message: 'Getting all users' , status: 'success'});
});

//Get - api/movies
app.get('/api/v1/movies', (req, res) => {
  res.status(200).json({ status: 'success',
     data: { movies: movies } });
});

//Post - api/movies
app.post('/api/v1/movies', (req, res) => {
    console.log(req.body);
  const newMovie = req.body;
  movies.push(newMovie);
  fs.writeFileSync('./data/movies.json', JSON.stringify(movies));
  res.status(201).json({ status: 'success', data: { movie: newMovie } });
});

//create a server
const port = 3200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});