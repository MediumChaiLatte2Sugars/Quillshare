const Express = require('express');
const router = Express.Router();
const { Messages } = require('../models')

// GET all Messages ------ /api/stories
router.get('/', (req, res) => {
  Messages.findAll()
    .then(mes => {
      const data = {
        mes,
        message: 'test message'
      }
      res.send(data)
    })
    .catch((err) => console.log('err:', err))
});

module.exports = router;
