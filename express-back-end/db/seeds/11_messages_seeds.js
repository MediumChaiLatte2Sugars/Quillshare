const { Messages } = require('../../models');

exports.seed = knex => knex(Messages.tableName).del()
  .then(() => [
    {}
  ])
  .then(mes => Promise.all(mes.map(s => Messages.create(s))))
  .catch(err => console.log('err: ', err))