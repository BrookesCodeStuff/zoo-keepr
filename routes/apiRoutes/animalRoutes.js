const router = require('express').Router();
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post('/animals', (req, res) => {
  // Set ID based on what the nex tindex of the array will be
  req.body.id = animals.length.toString();

  // If any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    // Add animal to JSON file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

module.exports = router;
