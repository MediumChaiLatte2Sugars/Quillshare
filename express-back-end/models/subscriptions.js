const createModel = require('../helpers/model-helper')

const name = 'Subscriptions'
const tableName = 'subscriptions'

// Properties that are allowed to be selected from the database for reading.
// (e.g., `password` is not included and thus cannot be selected)
const selectableProps = [
  'id',
  'user1',
  'user2',
  'category_id',
  'tags_id',
  'story_id',
  'created_at'
]

module.exports = knex => {
  const model = createModel({
    knex,
    name,
    tableName,
    selectableProps
  });

  return {
    ...model,
  }
}