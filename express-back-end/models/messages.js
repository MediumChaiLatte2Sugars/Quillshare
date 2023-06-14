const createModel = require('../helpers/model-helper')

const name = 'Messages'
const tableName = 'messages'

const selectableProps = [
  'id',
  'user1',
  'user2',
  'message_content',
  'room_number',
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