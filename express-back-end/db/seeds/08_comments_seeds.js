const { Comments } = require('../../models');

exports.seed = knex => knex(Comments.tableName).del()
  .then(() => [
    {
      'user_id': 2,
      'story_id': 1,
      'content': 'Wow interesting story!',
    },
    {
      'user_id': 2,
      'story_id': 1,
      'content': 'You had my likes <3 !',
    }
  ])
  .then(comment => Promise.all(comment.map(s => Comments.create(s))))
  .catch(err => console.log('err: ', err))
