const Student = require('../models/studentModel');
const Account = require('../models/accountModel');
const Hash_tools = require('../tools/hash_tools');

module.exports = {
    studentPIN,
    accountPIN
}

// Compares req.body.pin to hashed_pin for req.body.account_id
// Does not check or pull data from token
// Use this middleware when account user (parent) is logged in.
const accountPIN = async (req, res, next) => {
    if (!req.body.pin) {
        res.status(400).json({ message: 'PIN required as req.body.pin'});
    }
    if (!req.body.student_id) {
        res.status(400).json({ message: 'Request requires req.body.account_id'});
    }
    Account.findById(req.body.account_id)
    .then(account => {
        if (!account) {
            res.status(404).json({ message: 'Account not found to match PIN.' })
        }
        const input_hash = Hash_tools.hasher(req.body.pin);
        if (input_hash == account.hashed_pin) {
            next();
        } else {
            res.status(401).json({ message: 'PIN did not match.' });
        }
    })
    .catch( err => {
        res.status(500).json({ message: 'Failed to retrieve account info to match PIN.'});
    });
}

// Compares req.body.pin to hashed_pin for req.body.student_id
// Does not check or pull data from token
// Use this middleware for student endpoints
const studentPIN = async (req, res, next) => {
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