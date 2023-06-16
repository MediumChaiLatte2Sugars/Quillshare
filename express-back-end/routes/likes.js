const Express = require('express');
const router = Express.Router();
const { Likes } = require('../models')

router.get('/', (req, res) => {
  Likes.findAll()
    .then(likes => {
      res.send(likes)
    })
    .catch((err) => console.log('err:', err))
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Likes.findById(id)
    .then(users => {
      res.send(likes)
    })
    .catch((err) => console.log('err:', err))
})

router.put('/:id', (req, res) => {
  const likeId = req.params.id;
  const props = req.body
  Likes.update(likeId, props)
    .then((like) => {
      res.send(like);
    })
    .catch((err) => console.log('err:', err));
});

router.post('/', (req, res) => {
  const props = req.body
  Likes.create(props)
    .then((like) => {
      res.send(like);
    })
    .catch((err) => console.log('err:', err))
});

router.delete('/:id', (req, res) => {
  const likeId = req.params.id;
  Likes.destroy(likeId)
    .then(() => res.sendStatus(204))
    .catch((err) => console.log('err:', err))
});

module.exports = router;
