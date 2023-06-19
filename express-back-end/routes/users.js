const Express = require("express");
const router = Express.Router();
const {
  Users,
  Stories,
  SavedStories,
  Subscriptions,
  StoryCategories,
  Tags,
  Likes,
} = require("../models");

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
router.get("/", (req, res) => {
  Users.findAll()
    .then((users) => {
      const data = {
        users,
        message: "Get all user",
      };
      res.send(data);
    })
    .catch((err) => console.log("err:", err));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then((users) => {
      const data = {
        users,
        message: "Get all user",
      };
      res.send(data);
    })
    .catch((err) => console.log("err:", err));
});

// GET user name by id
router.get("/:userId/name", async (req, res) => {
  const userId = req.params.userId;
  Users.findById(userId)
    .then((user) => {
      res.send(user[0].username);
    })
    .catch((err) => console.log("err:", err));
});

// GET user name by id
router.get("/:userId/email", async (req, res) => {
  const userId = req.params.userId;
  Users.findById(userId)
    .then((user) => {
      res.send(user[0].email);
    })
    .catch((err) => console.log("err:", err));
});

/***
 *
 *  User Feeds
 *
 */
router.get("/:id/feeds", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findById(id);
  let subscriptions = await Subscriptions.find({
    user1: user.length === 1 ? user[0].id : null,
  });
  let storyFeeds = [];
  try {
    subscriptions = await Promise.all(
      subscriptions.map(async (subs) => {
        /**
         * Retrieve all the stories under subscribed:
         * Category-stories,
         * Followed UserStories,
         * tagsStories,
         * Saved Stories
         */
        if (subs.category_id !== null) {
          storyFeeds.push(
            await StoryCategories.getAllStoriesByCategoryId(subs.category_id)
          );
        }
        if (subs.user2 !== null) {
          let newStories = await Stories.find({
            user_id: subs.user2,
            type: "public",
            status: "published",
          });
          newStories = newStories.map((oldProp, newProp) => ({
            ["story_id"]: oldProp.id,
            ...oldProp,
          }));
          storyFeeds.push(newStories);
        }
        if (subs.story_id !== null) {
          let newStories = await Stories.findById(subs.story_id);
          newStories = newStories.map((oldProp, newProp) => ({
            ["story_id"]: oldProp.id,
            ...oldProp,
          }));
          storyFeeds.push(newStories);
        }
        if (subs.tag_name !== null) {
          storyFeeds.push(await Tags.getAllStoriesbyTagName(subs.tag_name));
        }
      })
    );

    storyFeeds = storyFeeds
      .flat()
      .filter(
        (v, i, a) => a.findIndex((v2) => v2.story_id === v.story_id) === i
      )
      .sort((a, b) => a.created_at - b.created_at);
    res.send({ ...user, storyFeeds });
  } catch (err) {
    console.error(err);
  }
});
/***
 *
 *  User Stories
 *
 */
router.get("/:id/stories", (req, res) => {
  const userId = req.params.id;
  Stories.find({ user_id: userId })
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

// GET a user's like for a specific story
router.get("/:userId/story/likes", (req, res) => {
  const userId = req.params.userId;
  const storyId = req.query.story_id;

  Likes.findOne({
    user_id: userId,
    story_id: storyId,
  })
    .then((like) => {
      if (like) {
        res.send(like);
      } else {
        res.status(200).send(null);
      }
    })
    .catch((err) => {
      console.error("err:", err);
    });
});

// GET all saved stories of a user by id ---- /api/users/:id/saved-stories
router.get("/:id/saved-stories", (req, res) => {
  const userId = req.params.id;
  SavedStories.getAllSavedStoriesbyUserId(userId)
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

// GET one saved storiy of a user by id ---- /api/users/:userId/saved-stories/:bookmarkId
router.get("/:userId/saved-stories/:bookmarkId", (req, res) => {
  const userId = req.params.userId;
  const storyId = req.params.bookmarkId;

  SavedStories.findOne({
    user_id: userId,
    story_id: storyId,
  })
    .then((story) => {
      if (story) {
        res.send(story);
      } else {
        res.send(null);
      }
    })
    .catch((err) => console.log("err:", err));
});

// POST a new story to a user's saved stories ---- /api/users/:id/saved-stories
router.post("/:id/saved-stories", (req, res) => {
  const props = req.body;
  SavedStories.create(props)
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

// UPDATE a user's saved story by id  ---- /api/users/:userId/saved-stories/:id
router.put("/:userId/saved-stories/:id", (req, res) => {
  const id = req.params.id;
  const props = req.body;

  SavedStories.update(id, props)
    .then((stories) => {
      res.send(stories);
    })
    .catch((err) => console.log("err:", err));
});

// DELETE a user's saved story by id  ---- /api/users/:userId/saved-stories/:id
router.delete("/:userId/saved-stories/:bookmarkId", (req, res) => {
  const userId = req.params.userId;
  const bookmarkId = req.params.bookmarkId;

  SavedStories.destroy(bookmarkId)
    .then(() => res.sendStatus(204))
    .catch((err) => console.log('err:', err))
});

// UPDATE a user by id  ---- /api/users/:id
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const props = req.body;

  Users.update(userId, props)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => console.log("err:", err));
});

// POST a new user  ---- /api/users
router.post("/", (req, res) => {
  console.log(req.body);
  const props = req.body;
  Users.create(props)
    .then((user) =>
      res.json({
        ok: true,
        message: "User created",
        user,
      })
    )
    .catch((err) => console.log("err:", err));
});

// DELETE a user by id
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  Users.destroy(userId)
    .then((users) => res.send(users))
    .catch((err) => console.log("err:", err));
});

module.exports = router;
