const createModel = require('../helpers/model-helper')

const name = 'Stories'
const tableName = 'stories'

const selectableProps = [
  'id',
  'user_id',
  'category_id',
  'unique_id',
  'title',
  'content',
  'status',
  'type',
  'view_count',
  'created_at',
  'published_date',
  'updated_at',
]

const newSelectableProps = [
  'id',
  'user_id',
  'category_id',
  'categories.name as category_name',
  'title',
  'content',
  'status',
  'type',
  'view_count',
  'created_at',
  'published_date',
  'updated_at',
  // 'likes'
]


module.exports = knex => {
  const model = createModel({
    knex,
    name,
    tableName,
    selectableProps
  })

  return {
    ...model
  }
}