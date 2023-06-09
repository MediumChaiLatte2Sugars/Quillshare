const createModel = require('../helpers/model-helper')

const name = 'Messages'
const tableName = 'Messages'

const selectableProps = [
  'id',
  'user1',
  'user2',
  'story_id',
  'message_content',
  'is_read',
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