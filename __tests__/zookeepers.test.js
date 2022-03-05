const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json');
const fs = require('fs');
const { start } = require('repl');

jest.mock('fs');

test('creates a new Zookeeper', () => {
  const zookeeper = createNewZookeeper(
    {
      id: 3,
      name: 'Jane',
    },
    zookeepers
  );

  expect(zookeeper.name).toBe('Jane');
  expect(zookeeper.id).toEqual(3);
});

test('finds a zookeeper by ID', () => {
  const startingZookeepers = [
    {
      id: '3',
      name: 'Jane',
      age: 33,
      favoriteAnimal: 'Trinket',
    },
    {
      id: '4',
      name: 'John',
      age: 35,
      favoriteAnimal: 'Erica',
    },
  ];

  const result = findById('3', startingZookeepers);

  expect(result.name).toBe('Jane');
});

test('filters zookeepers by query', () => {
  const startingZookeepers = [
    {
      id: '3',
      name: 'Jane',
      age: 33,
      favoriteAnimal: 'Trinket',
    },
    {
      id: '4',
      name: 'John',
      age: 35,
      favoriteAnimal: 'Erica',
    },
  ];

  const updatedZookeepers = filterByQuery(
    { favoriteAnimal: 'Trinket' },
    startingZookeepers
  );

  expect(updatedZookeepers.length).toEqual(1);
});

test("validates a zookeeper's age", () => {
  const zookeeper = {
    id: '3',
    name: 'Jane',
    age: 33,
    favoriteAnimal: 'Trinket',
  };

  const invalidZookeeper = {
    id: '4',
    name: 'John',
    age: '44',
    favoriteAnimal: 'Erica',
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
