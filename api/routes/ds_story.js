const router = require('express').Router();

const Story = require('../models/storyModel.js');

/* NOT PROTECTED BY OKTA TOKEN!
    FOR DS USE ONLY!
    USE DS AUTHENTICATION MIDDLEWARE! */

router.get('/:story_id', (req, res) => {
  const { story_id } = req.params;
  Story.findById(story_id)
    .then((story) => {
      if (story) {
        res.status(200).json(story);
      } else {
        res.status(404).json({ message: 'Story not found.' });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Failed to retrieve story.', error: err });
    });
});

router.patch('/:story_id', (req, res) => {
  const { story_id } = req.params;
  const story_info = req.body;
  Story.findById(story_id)
    .then((story) => {
      if (!story) {
        res.status(404).json({ message: 'Story not found.' });
      }
      Story.update(story_info, story_id).then((updated_story) => {
        res.status(200).json(updated_story);
      });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to access story.' });
    });
});

module.exports = router