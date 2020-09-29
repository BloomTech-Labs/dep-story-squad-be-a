const router = require('express').Router();

const Reading = require('../models/readingModel.js');
const Prompt = require('../models/promptModel.js');

router.get('/:reading_id', (req, res) => {
    const { reading_id } = req.params;
    Reading.findById(reading_id)
    .then(reading => {
        if (!reading) {
            res.status(404).json({ message: 'Reading not found.' })
        } else {
            res.status(200).json(reading);
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve reading.' })
    })
})

router.get('/:reading_id/prompts', (req, res) => {
    const { reading_id } = req.params;
    Prompt.findAllByReading(reading_id)
    .then(prompts => {
        if (!prompts) {
            res.status(404).json({ message: 'No prompts for specified reading.' });
        } else {
            res.status(200).json(prompts);
        }
    })
})

module.exports = router