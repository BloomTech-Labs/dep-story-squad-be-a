const router = require('express').Router();

const Story = require('../models/storyModel.js');
const Student = require('../models/studentModel.js');
const Account = require('../models/accountModel.js');

router.get('/:story_id', (req, res) => {
    const { story_id } = req.params;
    Story.findById(story_id)
    .then(story => {
        if (story) {
            res.status(200).json(story);
        } else {
            res.status(404).json({ message: 'Story not found.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve story.', error: err});
    });
});

router.patch('/:story_id', (req, res) => {
    const { story_id } = req.params;
    Story.findById(story_id)
    .then(story => {
        if (!story) {
            res.status(404).json({ message: 'Story not found.' });
        }
        Student.findById(story.student_id)
        .then(student => {
            if (!student) {
                res.status(410).json({ message: 'Authoring student no longer active.' });
            }
            Account.findById(student.account_id)
                .then(account => {
                    if (account.email != req.jwt.claims.email) {
                        res.status(403).json({ message: 'Story not associated with logged-in account.' });
                    }
                    Story.update(req.body, story_id)
                    .then(updated_story => {
                        res.status(200).json(updated_story);
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'Error updating story.', error: err });
                    });
                })
                .catch(err => {
                    res.status(500).json({ message: 'Error retrieving user info for story author account.', error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving info for story author (student).', error: err });
        });
    })
    .catch(err => {
        res.status(500).json({ message: 'Error retrieving story by ID parameter.', error: err });
    });
});

router.post('/', (req, res) => {
    if (!req.body.student_id) {
        res.status(400).json({ message: 'Student ID required.' });
    }
    Story.add(req.body)
    .then(story => {
        res.status(200).json(story);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to add story.', error: err });
    });
});

module.exports = router