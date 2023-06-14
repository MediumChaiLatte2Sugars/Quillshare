const { Subscriptions } = require('../../models');

exports.seed = knex => knex(Subscriptions.tableName).del()
  .then(() => [
    {
      'user1': 2,
      'user2': 1,
      'category_id': null,
      'tag_name': null,
      'story_id': null,
    },
    {
      'user1': 1,
      'user2': null,
      'category_id': 1,
      'story_id': null,
    },
    {
      'user1': 2,
      'user2': null,
      'category_id': 2,
      'story_id': null,
    },
    {
      'user1': 2,
      'user2': null,
      'category_id': null,
      'story_id': 1,
    },
    {
      'user1': 2,
      'user2': null,
      'category_id': null,
      'story_id': null,
      'tag_name': 'peace',
    }
  ])
  .then(subs => Promise.all(subs.map(s => Subscriptions.create(s))))
  .catch(err => console.log('err: ', err))
