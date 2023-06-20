const { faker } = require('@faker-js/faker');
const { Users } = require('../../models');

exports.seed = knex => knex(Users.tableName).del()
  .then(() => [
    {
      username: 'Charles Admin',
      password: 'password',
      email: 'admin@email.com',
      profile_pic: faker.image.urlPicsumPhotos(),
      bio: faker.person.bio()
    },
    {
      username: 'Test User',
      password: '123',
      email: 'test@email.com',
      profile_pic: faker.image.urlPicsumPhotos(),
      bio: faker.person.bio()
    },
    { 
      username: "Squiddy8231",
      password: "auth0|6490b79bf1ac1401362ce54b",
      email: "jobaf92047@anomgo.com",
      profile_pic: "{}",
      bio: "\"Master of sarcasm, lover of clarinets. Embracing the grumpy life. 🐙 #SquidwardVibes\"",
    },
    {
      username: "ZippityDooDah",
      password: "auth0|648f662a1413ef120a25410b",
      email: "xipoley763@aramask.com",
      profile_pic: "{}",
      bio: "Balloon Animal Whisperer 🎈 | Pogo Stick Pro 🤹‍♂️ | Whimsical Sock Collector 🧦",
    },
    {
      username: "Carl Carl V",
      password: "auth0|648957236dec6871414f3937",
      email: "wesixe8385@bodeem.com",
      profile_pic: "{}",
      bio: "I am Carl Carl IV",
    }
  ])
  .then(newUsers => Promise.all(newUsers.map(user => Users.create(user))))
  .catch(err => console.log('err: ', err))
