const createModel = require('../helpers/model-helper')

const name = 'Tags'
const tableName = 'tags'

const selectableProps = [
  'id',
  'story_id',
  'name',
  'created_at',
]

const newSelectableProps = [
  'tags.id',
  'tags.story_id',
  'tags.name as tag_name',
  'user_id',
  'title',
  'content',
  'status',
  'type',
  'view_count',
  'created_at',
  'published_date',
  'updated_at'
]

module.exports = knex => {
  const model = createModel({
    knex,
    name,
    tableName,
    selectableProps,
  })

  return {
    ...model
  }
}