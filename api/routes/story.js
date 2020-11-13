const router = require('express').Router();

const Story = require('../models/storyModel.js');
const Student = require('../models/studentModel.js');
const Account = require('../models/accountModel.js');

// This route is for user-generated stories.
// App-provided stories/chapters use /reading

// All endpoints protected by authRequired;
// Okta token required.

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
  Story.findById(story_id)
    .then((story) => {
      if (!story) {
        res.status(404).json({ message: 'Story not found.' });
      }
      // Confirm that story is from student associated with logged-in account:
      // TODO: match PIN of logged-in student with authoring student
      Student.findById(story.student_id)
        .then((student) => {
          if (!student) {
            res
              .status(410)
              .json({ message: 'Authoring student no longer active.' });
          }
          Account.findById(student.account_id)
            .then((account) => {
              if (account.email != req.jwt.claims.email) {
                res
                  .status(403)
                  .json({
                    message: 'Story not associated with logged-in account.',
                  });
              } else {
                  // Control what info can be updated here
                  let updated_info = {}
                  if (req.body.s3_url){ updated_info.s3_url = req.body.s3_url }
                  if (req.body.s3_key){ updated_info.s3_key = req.body.s3_key }
                  if (req.body.about){ updated_info.about = req.body.about }
                Story.update(updated_info, story_id)
                  .then((updated_story) => {
                    res.status(200).json(updated_story);
                  })
                  .catch((err) => {
                    res
                      .status(500)
                      .json({ message: 'Error updating story.', error: err });
                  });
              }
            })
            .catch((err) => {
              res
                .status(500)
                .json({
                  message:
                    'Error retrieving user info for story author account.',
                  error: err,
                });
            });
        })
        .catch((err) => {
          res
            .status(500)
            .json({
              message: 'Error retrieving info for story author (student).',
              error: err,
            });
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: 'Error retrieving story by ID parameter.',
          error: err,
        });
    });
});

router.post('/', (req, res) => {
  if (!req.body.student_id) {
    res.status(400).json({ message: 'Student ID required.' });
  }
  const new_story = {
      student_id: req.body.student_id,
      prompt_id: req.body.prompt_id,
      s3_url: req.body.s3_url || '',
      s3_key: req.body.s3_key || '',
      about: req.body.about || {}
  }
  Story.add(new_story)
    .then((story) => {
      res.status(200).json(story);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to add story.', error: err });
    });
});

module.exports = router;
