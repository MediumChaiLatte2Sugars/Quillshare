const { Categories } = require('../../models');

exports.seed = knex => knex(Categories.tableName).del()
  .then(() => [
    { name: 'Fiction' },
    { name: 'Non-fiction' },
    { name: 'Mystery' },
    { name: 'Romance' },
    { name: 'Science Fiction' },
    { name: 'Fantasy' },
    { name: 'Biography' },
    { name: 'Historical' },
    { name: 'Thriller' },
    { name: 'Horror' },
    { name: 'How To' },
    { name: 'Science' },
    { name: 'Technology' },
    { name: 'Humor' },
    { name: 'Adventure' },
    { name: 'AI' },
    { name: 'Short Story' },
    { name: 'Poetry' },
  ])
  .then(newCategory => Promise.all(newCategory.map(category => Categories.create(category))))
  .catch(err => console.log('err: ', err))
