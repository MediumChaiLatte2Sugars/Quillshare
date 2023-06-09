const createModel = require('../helpers/model-helper')

const name = 'Likes'
const tableName = 'likes'

const selectableProps = [
  'id',
  'user_id',
  'comments_id',
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