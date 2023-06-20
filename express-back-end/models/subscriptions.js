const createModel = require('../helpers/model-helper')

const name = 'Subscriptions'
const tableName = 'subscriptions'

const selectableProps = [
  'id',
  'user1',
  'user2',
  'category_id',
  'tag_name',
  'story_id',
  'created_at'
]

const newSelectableProps = [
  'subscriptions.id',
  'subscriptions.category_id',
  'subscriptions.tag_name',
  'subscriptions.story_id',
  'subscriptions.user2',
  'story.title',
  'story.content',
  'story.status',
  'story.type',
  'story.view_count',
  'story.created_at',
  'story.published_date',
  'updated_at'
]

const userProps = [
  'subscriptions.id as subsId',
  'users.id as userId',
  'users.email',
  'users.profile_pic',
  'users.bio',
]

module.exports = knex => {
  const model = createModel({
    knex,
    name,
    tableName,
    selectableProps,
    userProps
  });

  return {
    ...model,
  }
}