const Express = require('express');
const router = Express.Router();
const { Notifications } = require('../models')

// GET all Messages ------ /api/stories
router.get('/', (req, res) => {
  Notifications.findAll()
    .then(notif => {
      const data = {
        notif,
        message: 'test message'
      }
      res.send(data)
    })
    .catch((err) => console.log('err:', err))
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const props = req.body
  Notifications.update(id, props)
    .then((n) => {
      res.send(n);
    })
    .catch((err) => console.log('err:', err));
});

module.exports = router;
