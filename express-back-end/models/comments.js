const createModel = require('../helpers/model-helper')

const name = 'Comments'
const tableName = 'comments'

const selectableProps = [
  'id',
  'user_id',
  'story_id',
  'content',
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
