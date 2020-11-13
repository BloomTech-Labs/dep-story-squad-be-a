const router = require('express').Router();

const Prompt = require('../models/promptModel.js');

// Protected by authRequired middleware
// (need Okta token to access)

router.get('/:prompt_id', (req, res) => {
    const { prompt_id } = req.params;
    Prompt.findById(prompt_id)
    .then(prompt => {
        if (prompt) {
            res.status(200).json(prompt);
        } else {
            res.status(404).json({ message: 'Prompt not found.' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve prompt.' });
    })
})

module.exports = router