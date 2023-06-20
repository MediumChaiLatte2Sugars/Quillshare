const Express = require("express");
const router = Express.Router();
const { Stories, StoryCategories, Comments, Likes, Tags, Subscriptions } = require("../models");
const { v4: uuidv4 } = require('uuid');

// GET all stories ------ /api/stories
router.get("/", (req, res) => {
  Stories.findAll()
    .then((story) => {
      const data = {
        story,
        message: "Get all story",
      };
      res.send(data);
    })
    .catch((err) => console.log("err:", err));
});

// GET a single story by id ------ /api/stories/:id
router.get("/:id", (req, res) => {
  const storyId = req.params.id;
  Stories.findById(storyId)
    .then((story) => {
      res.send(story);
    })
    .catch((err) => console.log('err:', err));
  // Likes.findAll()
  //   .then((story) => {
  //     const data = {
  //       story,
  //       message: "Get all story",
  //     };
  //     res.send(data);
  //   })
  //   .catch((err) => console.log("err:", err));
});


// GET a single story by unique_id ------ /api/stories/:id
router.get("/id/:uniqueId", (req, res) => {
  const storyUniqueId = req.params.uniqueId;
  Stories.findOne({unique_id: storyUniqueId})
    .then((story) => {
      res.send(story);
    })
    .catch((err) => console.log('err:', err));
  // Likes.findAll()
  //   .then((story) => {
  //     const data = {
  //       story,
  //       message: "Get all story",
  //     };
  //     res.send(data);
  //   })
  //   .catch((err) => console.log("err:", err));
});

router.get("/:id/bookmarks", (req, res) => {
  const storyId = req.params.id;
  Subscriptions.find({story_id: storyId})
    .then((story) => {
      res.send(story);
    })
    .catch((err) => console.log('err:', err));
});

router.get("/:id/likes", (req, res) => {
  const storyId = req.params.id;
  Likes.find({story_id: storyId})
    .then((story) => {
      res.send(story);
    })
    .catch((err) => console.log('err:', err));
});

// UPDATE a story by id -----  /api/stories/:id
router.put("/:id", (req, res) => {
  const storyId = req.params.id;
  const props = req.body;
  const { category, ...rest } = props;
  const modifiedProps = { category_id: category, ...rest };
  console.log("Modded Props: ", modifiedProps);
  console.log("Req.body: ", req.body);
  console.log("storyId: ", storyId);

  Stories.update(storyId, modifiedProps)
    .then((story) => {
      console.log(story);
      res.send(story);
    })
    .catch((err) => console.log("err:", err));
});

// POST a new story -----   /api/stories
router.post("/", async (req, res) => {
  try {
    const props = {...req.body, unique_id: uuidv4()};
    console.log(props);

    // Extract tags from props
    const tags = props.tags.split(" ");

    // Assemble required data for Story db creation
    const storyData = {
      user_id: props.user_id, 
      category_id: props.category,
      title: props.title,
      content: JSON.stringify(props.editorState),
      status: "published",
      type: props.visibility,
      unique_id: props.unique_id,
    };

    console.log(storyData);

    // Create story
    const story = await Stories.create(storyData);

    // Associate story to category
    const params = {
      story_id: story[0].id,
      category_id: story[0].category_id,
    };

    console.log("story: ", story);

    await StoryCategories.create(params);

    // Associate story to tags
    for (let tag of tags) {
      await Tags.create({ story_id: story[0].id, name: tag });
    }

    res.json({
      ok: true,
      message: "Story created",
      story,
    });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({
      ok: false,
      message: "Failed to create story",
    });
  }
});

// POST a new comment -----   /api/stories/:id/comments
router.post('/:id/comments', (req, res) => {
  const props = req.body;
  Comments.create(props)
    .then(comment => {
      res.json({
        ok: true,
        message: 'Comment created',
        comment
      })
    })
    .catch((err) => console.log('err:', err))
});

// DELETE a story   ------   /api/stories/:id
router.delete("/:id", (req, res) => {
  const storyId = req.params.id;
  Stories.destroy(storyId)
    .then((story) => res.send(story))
    .catch((err) => console.log("err:", err));
});

module.exports = router;
