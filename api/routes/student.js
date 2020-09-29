const router = require('express').Router();

const Student = require('../models/studentModel.js');
const Account = require('../models/accountModel.js');
const Hash_tools = require('../tools/hash_tools');

router.get('/:student_id', (req, res) => {
    const { student_id } = req.params;
    Student.findById(student_id)
    .then(student => {
        if (student) {
            Account.findById(student.account_id)
            .then( account => {
                if (account.email == req.jwt.claims.email) {
                    res.status(200).json(student);
                } else {
                    res.status(401).json({ message: 'Account email for student does not match logged-in email.'});
                }
            })
        } else {
            res.status(404).json({ message: 'Could not find student with given id.'});
        }
    })
});

router.patch('/:student_id', (req, res) => {
    const { student_id } = req.params;
    Student.findById(student_id)
    .then(student => {
        if (student) {
            Account.findById(student.account_id)
            .then( account => {
                if (account.email == req.jwt.claims.email) {
                    let studentData = req.body;
                    const hash = Hash_tools.hasher(studentData.pin);
                    if (student.hashed_pin != hash) {
                        res.status(401).json({ message: 'PIN mismatch.' });
                    } else {
                        studentData.pin = hash;
                        Student.update(studentData, student_id)
                        .then(updated_student => {
                            res.status(200).json(updated_student);
                        })
                    }
                } else {
                    res.status(401).json({ message: 'Account email for student does not match logged-in email.'});
                }
            });
        } else {
            res.status(404).json({ message: 'Could not find student with given id.'});
        }
    });
});

router.post('/', (req, res)=>{
    Student.findByUsername(req.body.username)
    .then(found_student => {
        if (found_student) {
            res.status(409).json({ message: 'Username already taken.' })
        } else {
            let studentData = req.body;
            const hash = Hash_tools.hasher(studentData.pin);
            studentData.pin = hash;
            Student.add(studentData)
            .then(student => {
                Account.findById(student.account_id)
                .then(account => {
                    student_ids = account.student_ids;
                    student_ids.push(student.student_id);
                    Account.updateById({student_ids: student_ids }, student.account_id)
                    .then(updated_account => {
                        res.status(201).json(student);
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'Failed to update account list of student IDs.'});
                    })
                })
            })
            .catch (err => {
                res.status(500).json({ message: 'Failed to add student', error: err });
            });
        }
    });
});

module.exports = router