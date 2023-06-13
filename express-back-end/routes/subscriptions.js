const Express = require("express");
const router = Express.Router();
const { Notifications, Subscriptions} = require("../models");

router.get("/", (req, res) => {
  Subscriptions.findAll()
  .then(subs => {
    const data = {
      subs,
      message: 'test message'
    }
    res.send(data)
  })
  .catch((err) => console.log('err:', err))
});

module.exports = router;