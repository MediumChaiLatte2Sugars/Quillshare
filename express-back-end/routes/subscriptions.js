const Express = require("express");
const router = Express.Router();
const { Notifications, Subscriptions} = require("../models");

// GET all subscriptions ------ /api/subscriptions
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

// POST new subscription ------ /api/subscriptions
router.post("/", (req, res) => {
  Subscriptions.create(req.body)
  .then((sub) => {
    res.status(200).json("Subscription created successfully")
  })
  .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;