const { Messages } = require('../../models');

exports.seed = knex => knex(Messages.tableName).del()
  .then(() => [
    {
      'user1': 2,
      'user2': 1,
      'message_content': 'Hello!',
      'room_number': 1231,
      'is_read': false,
    }
  ])
  .then(mes => Promise.all(mes.map(s => Messages.create(s))))
  .catch(err => console.log('err: ', err))