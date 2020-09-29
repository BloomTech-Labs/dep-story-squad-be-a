const Student = require('../models/studentModel.js');
const Hash_tools = require('../tools/hash_tools');

// Compares req.body.pin to hashed_pin for req.body.student_id
// Does not check or pull data from token
const matchPIN = async (req, res, next) => {
    if (!req.body.pin) {
        res.status(400).json({ message: 'PIN required as req.body.pin'});
    }
    if (!req.body.student_id) {
        res.status(400).json({ message: 'Request requires req.body.student_id'});
    }
    Student.findById(req.body.student_id)
    .then(student => {
        if (!student) {
            res.status(404).json({ message: 'Student not found to match PIN.' })
        }
        const input_hash = Hash_tools.hasher(req.body.pin);
        if (input_hash == student.hashed_pin) {
            next();
        } else {
            res.status(401).json({ message: 'PIN did not match.' });
        }
    })
    .catch( err => {
        res.status(500).json({ message: 'Failed to retrieve student info to match PIN.'});
    });
}

export default matchPIN;