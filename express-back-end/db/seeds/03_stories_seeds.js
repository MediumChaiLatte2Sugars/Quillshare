'use strict'

const { Stories, Users } = require('../../models');
const { faker } = require('@faker-js/faker');

exports.seed = knex => knex(Stories.tableName).del()
  .then(() => Users.findAll())
  .then(users => {
    if (users.length <= 0) throw 'No users found'

    return users[0].id
  })
  .then(userId => [
    {
      user_id: 1,
      category_id: 1,
      unique_id: "b8e05cb3-f89e-48f5-b917-4a4bdd90c34d",
      title: faker.word.words(2),
      content: faker.lorem.paragraph(1) ,
      status: 'published',
      type: 'public',
      view_count: 200,
      created_at: knex.fn.now(),
      published_date: knex.fn.now(),
      updated_at: knex.fn.now()
    },
    {
      user_id: 1,
      category_id: 2,
      unique_id: "ba03373d-97d8-427e-81de-ddc8244c4799",
      title: faker.word.words(2),
      content: faker.lorem.paragraph(1) ,
      status: 'draft',
      type: 'private',
      view_count: 0,
      created_at: knex.fn.now(),
      published_date: null,
      updated_at: knex.fn.now()
    },
    {
      user_id: 2,
      category_id: 3,
      unique_id: "f9ee4dc3-0183-419f-bac2-4751e0126b62",
      title: faker.word.words(2),
      content: faker.lorem.paragraph(1) ,
      status: 'draft',
      type: 'private',
      view_count: 0,
      created_at: knex.fn.now(),
      published_date: null,
      updated_at: knex.fn.now()
    },
    {
      user_id: 2,
      category_id: 1,
      unique_id: "9c2ab406-e469-4633-bfb2-2ddff2b07549",
      title: faker.word.words(2),
      content: faker.lorem.paragraph(1) ,
      status: 'draft',
      type: 'private',
      view_count: 0,
      created_at: knex.fn.now(),
      published_date: null,
      updated_at: knex.fn.now()
    }
  ])
  .then(newStories => Promise.all(newStories.map(story => Stories.create(story))))
  .catch(err => console.log('err: ', err))