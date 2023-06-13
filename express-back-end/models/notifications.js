const createModel = require('../helpers/model-helper')

const name = 'Notifications'
const tableName = 'notifications'

const selectableProps = [
  'id',
  'user1',
  'user2',
  'story_id',
  'notification_type',
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