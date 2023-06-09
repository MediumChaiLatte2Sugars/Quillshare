const createModel = require('../helpers/model-helper')

const name = 'Subscriptions'
const tableName = 'subscriptions'

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