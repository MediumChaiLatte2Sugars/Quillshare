const Express = require('express');
const router = Express.Router();
const { Tags } = require('../models')

// GET all tags ------ /api/stories
router.get('/', (req, res) => {
  Tags.findAll()
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => console.log('err:', err))
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Tags.findById(id)
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => console.log('err:', err))
})

router.get('/:name', (req, res) => {
  const name = req.params.name;
  Tags.getAllStoriesbyTagName(name)
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => console.log('err:', err));
});

// UPDATE a tag by id ------ /api/tags/:id
router.put('/:id', (req, res) => {
  const tagId = req.params.id;
  const props = req.body.tag
  Tags.update(tagId, props)
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => console.log('err:', err));
});

// POST a new tag ------ /api/tags
router.post('/', (req, res) => {
  const props = req.body
  Tags.create(props)
    .then((tag) => {
      res.send(tag);
    })
    .catch((err) => console.log('err:', err))
});

// DELETE a tag by id ------ /api/tags/:id
router.delete('/:id', (req, res) => {
  const tagId = req.params.id;
  Tags.destroy(tagId)
    .then(tag => res.send(tag))
    .catch((err) => console.log('err:', err))
});

module.exports = router;
