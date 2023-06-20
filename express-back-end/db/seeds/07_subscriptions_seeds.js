const { Subscriptions } = require('../../models');

exports.seed = knex => knex(Subscriptions.tableName).del()
  .then(() => [
    {
      'user1': 2,
      'user2': null,
      'category_id': 2,
      'tag_name': null,
      'story_id': null
    },
    {
        'user1': 2,
        'user2': null,
        'category_id': null,
        'tag_name': null,
        'story_id': 1
    },
    {
        'user1': 2,
        'user2': null,
        'category_id': null,
        'tag_name': 'peace',
        'story_id': null
    },
    {
        'user1': 3,
        'user2': 4,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    },
    {
        'user1': 4,
        'user2': 3,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    },
    {
        'user1': 5,
        'user2': 3,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    },
    {
        'user1': 5,
        'user2': 4,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    },
    {
        'user1': 3,
        'user2': 4,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    },
    {
        'user1': 3,
        'user2': 5,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    },
    {
        'user1': 4,
        'user2': 5,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    },
    {
        'user1': 3,
        'user2': 3,
        'category_id': null,
        'tag_name': null,
        'story_id': null
    }
  ])
  .then(subs => Promise.all(subs.map(s => Subscriptions.create(s))))
  .catch(err => console.log('err: ', err))
