const Express = require('express');
const router = Express.Router();
const { Messages } = require('../models')

// GET all Messages ------ /api/stories

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Messages.findById(id)
    .then(mes => res.send(mes))
    .catch((err) => console.log('err:', err))
})

router.get("/:room_num", async (req, res) => {
  const id = req.params.room_num;
  Messages.find({room_number: id})
    .then(mes => res.send(mes))
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
  Messages.create(props)
    .then(mes => res.send(mes))
    .catch((err) => console.log('err:', err))
});

module.exports = router;
