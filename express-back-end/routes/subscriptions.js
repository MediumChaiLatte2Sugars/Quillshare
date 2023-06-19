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

// GET one subscription by user id by and other params------ /api/subscriptions
router.get("/check", (req, res) => {

  const user1 = req.query.user1;
  const user2 = req.query.user2;
  const category_id = req.query.category_id;
  const tag_name = req.query.tag_id;

  const filters = {
    user1: user1,
    user2: user2,
  }

  Subscriptions.find(filters)
  .then(subs => {
    const data = {
      subs,
      message: 'test message'
    }
    res.send(data)
  })
  .catch((err) => console.log('err:', err))
});

// GET all subscriptions by user by id------ /api/subscriptions
router.get("/:id", (req, res) => {

  const userId = req.params.id;
  console.log("Sub get req id: ", userId);
  Subscriptions.find({user1: userId})
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
  console.log("Sub post body: ", req.body);
  Subscriptions.create(req.body)
  .then((sub) => {
    res.status(200).send(sub);
  })
  .catch((err) => res.status(500).json({ error: err }));
});

// DELETE a subscription by id ------ /api/subscriptions
router.delete("/:id", (req, res) => {
  const subId = req.params.id;

  Subscriptions.destroy(subId)
    .then(() => res.sendStatus(204))
    .catch((err) => console.log('err:', err))
});


module.exports = router;