const { Likes } = require('../../models');

exports.seed = knex => knex(Likes.tableName).del()
  .then(() => [
    {
      'user_id': 2,
      'story_id': 1,
      'comments_id': null,
    },
    {
      'user_id': 1,
      'story_id': null,
      'comments_id':1,
    },
    {
      'user_id': 1,
      'story_id': null,
      'comments_id':2,
    }
  ])
  .then(like => Promise.all(like.map(s => Likes.create(s))))
  .catch(err => console.log('err: ', err))