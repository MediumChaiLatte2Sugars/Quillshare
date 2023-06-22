const { StoryCategories } = require('../../models');

exports.seed = knex => knex(StoryCategories.tableName).del()
  .then(() => [
    {
      story_id: 1,
      category_id: 1
    },
    {
      story_id: 2,
      category_id: 2
    },
    {
      story_id: 3,
      category_id: 3
    },
    {
      story_id: 4,
      category_id: 1
    },
    {
      story_id: 3,
      category_id: 1
    },
    {
      story_id: 4,
      category_id: 3
    },
    {
      story_id: 5,
      category_id: 1
    },
    {
      story_id: 6,
      category_id: 4
    },
    {
      story_id: 7,
      category_id: 9
    },
    {
      story_id: 8,
      category_id: 1
    },
    {
      story_id: 9,
      category_id: 5
    },
    {
      story_id: 10,
      category_id: 6
    },
    {
      story_id: 11,
      category_id: 7
    },
    {
      story_id: 12,
      category_id: 1
    },
    {
      story_id: 13,
      category_id: 14
    }
  ]
  )
  .then(sc => Promise.all(sc.map(stories => StoryCategories.create(stories))))
  .catch(err => console.log('err: ', err))
