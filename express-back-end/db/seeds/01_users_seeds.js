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
      password: "5BT?xW%ck87MKm^",
      email: "jobaf92047@anomgo.com",
      profile_pic: "{}",
      bio: "\"Master of sarcasm, lover of clarinets. Embracing the grumpy life. 🐙 #SquidwardVibes\"",
    },
    {
      username: "ZippityDooDah",
      password: "5BT?xW%ck87MKm^",
      email: "xipoley763@aramask.com",
      profile_pic: "{}",
      bio: "Balloon Animal Whisperer 🎈 | Pogo Stick Pro 🤹‍♂️ | Whimsical Sock Collector 🧦",
    },
    {
      username: "Carl Carl V",
      password: "b5C9R&bq;NSF~eX",
      email: "wesixe8385@bodeem.com",
      profile_pic: "{}",
      bio: "I am Carl Carl IV",
    }
  ])
  .then(newUsers => Promise.all(newUsers.map(user => Users.create(user))))
  .catch(err => console.log('err: ', err))
