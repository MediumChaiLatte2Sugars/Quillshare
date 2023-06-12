const { Notifications } = require('../../models');

exports.seed = knex => knex(Notifications.tableName).del()
  .then(() => [
    {
      'user1': 1,
      'user2': 2,
      'story_id': null,
      'notification_type': `${'User 2\'s name here'} started following you`,
      'is_read': false,
    },
    {
      'user1': 2,
      'user2': 1,
      'story_id': null,
      'notification_type': 'published a story',
      'is_read': false,
    },
    {
      'user1': 2,
      'user2': 1,
      'story_id': 1,
      'notification_type': 'updates a story',
      'is_read': false,
    },
    {
      'user1': 1,
      'user2': 2,
      'story_id': 1,
      'notification_type': 'likes on your story',
      'is_read': false,
    },
    {
      'user1': 2,
      'user2': 1,
      'story_id': 1,
      'notification_type': 'conmmented on your story',
      'is_read': false,
    },
    {
      'user1': 1,
      'user2': 2,
      'story_id': 1,
      'notification_type': 'conmmented on your story',
      'is_read': false,
    },
  ])
  .then(like => Promise.all(like.map(s => Notifications.create(s))))
  .catch(err => console.log('err: ', err))