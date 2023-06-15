module.exports = ({
  knex = {},
  name = 'name',
  tableName = 'tablename',
  selectableProps = [],
  timeout = 1000,
  newSelectableProps = [],
}) => {
  const create = props => {
    delete props?.id // not allowed to set `id`

    return knex.insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout)
  }

  const findAll = () => knex.select(selectableProps)
    .from(tableName)
    .timeout(timeout)

  const find = filters => knex.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout)

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = filters => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results

      return results[0]
    })

  const findById = id => knex.select(selectableProps)
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  const update = (id, props) => {
    delete props.id // not allowed to set `id`

    return knex.update(props)
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout)
  }

  const destroy = id => knex.del()
    .from(tableName)
    .where({ id })
    .timeout(timeout)

  const getAllStoriesByCategoryId = (val) => knex.select(newSelectableProps)
    .from(tableName)
    .join('stories', 'stories.id', '=', 'story_categories.story_id')
    .join('categories', 'categories.id', '=', 'story_categories.category_id')
    .where({'story_categories.category_id': val})
    .andWhere('stories.type', 'public')
    .andWhere('stories.status', 'published')
    .timeout(timeout)

  const getAllSavedStoriesbyUserId = (val) => knex.select(newSelectableProps)
    .from(tableName)
    .join('stories', 'stories.id', '=', 'saved_stories.story_id')
    .where({'saved_stories.user_id': val})
    .andWhere('stories.type', 'public')
    .andWhere('stories.status', 'published')
    .timeout(timeout)

  const getAllStoriesbyTagName = (val) => knex.select(newSelectableProps)
    .from(tableName)
    .join('stories', 'stories.id', '=', 'tags.story_id')
    .where({'tags.name': val})
    .andWhere('stories.type', 'public')
    .andWhere('stories.status', 'published')
    .timeout(timeout)

  return {
    name,
    tableName,
    selectableProps,
    newSelectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
    getAllStoriesByCategoryId,
    getAllSavedStoriesbyUserId,
    getAllStoriesbyTagName,
  }
}