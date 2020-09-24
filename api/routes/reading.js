const router = require('express').Router();

const Reading = require('../models/readingModel.js');

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

module.exports = router