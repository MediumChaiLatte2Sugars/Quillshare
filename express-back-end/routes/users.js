const Express = require("express");
const router = Express.Router();
const { Users, Stories, SavedStories, Subscriptions, StoryCategories, Tags} = require("../models");

// Handle user login  ---- /api/users/login/:id
router.get("/login/:id", (req, res) => {
  console.log(req.params.id);
  const email = req.params.id;
  Users.find({ email })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => console.log("err:", err));
});

// GET all users ---- /api/users
router.get('/', (req, res) => {
  Users.findAll()
    .then(users => {
      const data = {
        users,
        message: 'Get all user'
      }
      res.send(data)
    })
    .catch((err) => console.log('err:', err))
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then(users => {
      const data = {
        users,
        message: 'Get all user'
      }
      res.send(data)
    })
    .catch((err) => console.log('err:', err))
})

// GET a user by id ---- /api/users/:id
router.get("/:id/feeds", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findById(id);
  let subscriptions = await Subscriptions.find({user1: user.length === 1 ? user[0].id : null})
  let storyFeeds = [];
  try {
    subscriptions = await Promise.all(subscriptions.map(async(subs) =>  {
      /**
       * Retrieve all the stories under subscribed:
       * Category-stories, 
       * Followed UserStories, 
       * tagsStories, 
       * Saved Stories
       */
      if(subs.category_id !== null) {
        storyFeeds.push(await StoryCategories.getAllStoriesByCategoryId(subs.category_id))
      }
      if(subs.user2 !== null) {
        let newStories = await Stories.find({user_id: subs.user2, type: 'public', status: 'published'})
        newStories= newStories.map((oldProp, newProp) => ({
          ['story_id']: oldProp.id,
          ...oldProp
        }))
        storyFeeds.push(newStories)
      }
      if(subs.story_id !== null) {
        let newStories = await Stories.findById(subs.story_id)
        newStories= newStories.map((oldProp, newProp) => ({
          ['story_id']: oldProp.id,
          ...oldProp
        }))
        storyFeeds.push(newStories)
      }
      if(subs.tag_name !== null) {
        storyFeeds.push(await Tags.getAllStoriesbyTagName(subs.tag_name))
      }
    }))

    storyFeeds = storyFeeds.flat().filter((v,i,a)=>a.findIndex(v2=>(v2.story_id===v.story_id))===i)
    res.send({...user,storyFeeds})
  } catch (err) {
    console.error(err);
  }
});

// GET stories of a user by id ---- /api/users/:id/stories
router.get("/:id/stories", (req, res) => {
  const userId = req.params.id;
  Stories.find({ user_id: userId })
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

router.get("/:id/saved-stories", (req, res) => {
  const userId = req.params.id;
  SavedStories.getAllSavedStoriesbyUserId(userId )
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

router.post("/:id/saved-stories", (req, res) => {
  const props = req.body
  SavedStories.create(props )
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

router.put("/:userId/saved-stories/:id", (req, res) => {
  const id = req.params.id;
  const props = req.body

  SavedStories.update(id, props )
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

// UPDATE a user by id  ---- /api/users/:id
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const props = req.body

  Users.update(userId, props)
    .then(users => {
      console.log(users)
      res.send(users)
    })
    .catch((err) => console.log('err:', err))
});

// POST a new user  ---- /api/users
router.post('/', (req, res) => {
  const props = req.body
  Users.create(props)
    .then(user => res.json({
        ok: true,
        message: 'User created',
        user
      }))
    .catch((err) => console.log('err:', err))
});

// DELETE a user by id
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  Users.destroy(userId)
    .then((users) => res.send(users))
    .catch((err) => console.log("err:", err));
});

module.exports = router;
