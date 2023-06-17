exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('profile_pic');
      table.text('bio');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
    })

    .createTable('categories', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
    })

    .createTable('stories', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.integer('category_id').unsigned().notNullable();
      table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('unique_id').notNullable();
      table.string('title');
      table.text('content');
      table.string('status').defaultTo('draft');
      table.string('type').defaultTo('private');
      table.integer('view_count').defaultTo(0); 
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('published_date');
      table.timestamp('updated_at');
    })
    
    .createTable('tags', function (table) {
      table.increments('id').primary();
      table.integer('story_id').unsigned().notNullable();
      table.foreign('story_id').references('id').inTable('stories').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    
    .createTable('story_categories', function (table) {
      table.increments('id').primary();
      table.integer('story_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.foreign('story_id').references('id').inTable('stories').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');
    })

    .createTable('saved_stories', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('story_id').unsigned().notNullable();
      table.foreign('story_id').references('id').inTable('stories').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('subscriptions', function (table) {
      table.increments('id').primary();
      table.integer('user1').unsigned().notNullable();
      table.integer('user2').unsigned();
      table.integer('category_id').unsigned();
      table.integer('story_id').unsigned();
      table.foreign('user1').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('user2').references('id').inTable('users');
      table.foreign('category_id').references('id').inTable('categories');
      table.foreign('story_id').references('id').inTable('stories');
      table.string('tag_name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('comments', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('story_id').unsigned().notNullable();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('story_id').references('id').inTable('stories').onDelete('CASCADE').onUpdate('CASCADE');
      table.text('content');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('likes', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.integer('story_id').unsigned();
      table.integer('comments_id').unsigned();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('story_id').references('id').inTable('stories');
      table.foreign('comments_id').references('id').inTable('comments');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('notifications', function (table) {
      table.increments('id').primary();
      table.integer('user1').unsigned().notNullable();
      table.integer('user2').unsigned();
      table.integer('story_id').unsigned();
      table.foreign('user1').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('user2').references('id').inTable('users');
      table.foreign('story_id').references('id').inTable('stories');
      table.string('notification_type');
      table.boolean('is_read').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    .createTable('messages', function (table) {
      table.increments('id').primary();
      table.integer('user1').unsigned().notNullable();
      table.integer('user2').unsigned().notNullable();
      table.integer('room_number').unsigned().notNullable();
      
      table.foreign('user1').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.foreign('user2').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
      table.text('message_content');
      table.boolean('is_read').defaultTo(false);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

const tables = [
  'users',
  'categories',
  'stories',
  'tags',
  'story_categories',
  'saved_stories',
  'subscriptions',
  'comments',
  'likes',
  'notifications',
  'messages'
]

exports.down = function(knex) {
  return Promise.all(tables.map(async function (table) {
    try {
      console.log(table, 'down start')
      await knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`)
      console.log(table, 'down finish')
    } catch (err) {
      console.error(err.detail)
    }

    return true
  }))
};
