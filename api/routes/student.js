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
            .catch(err => {
                res.status(500).json({ message: 'Error retrieving info for found student.', error: err });
            })
        } else {
            res.status(404).json({ message: 'Could not find student with given id.'});
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error retrieving student info for ID param.', error: err });
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
            })
            .catch( err => {
                res.status(500).json({ message: 'Error retrieving account for student.', error: err })
            });
        } else {
            res.status(404).json({ message: 'Could not find student with given id.'});
        }
    })
    .catch( err => {
        res.status(500).json({ message: 'Error retrieving student info for ID parameter.', error: err });
    });
});

router.post('/', (req, res)=>{
    const username = req.body.username;
    Student.findByUsername(username)
    .then(found_student => {
        console.log('found_student: ', found_student);
        if (found_student) {
            res.status(409).json({ message: 'Username already taken.' })
        } else {
            let studentData = req.body;
            const hash = Hash_tools.hasher(studentData.pin);
            const new_student = {
                username: studentData.username,
                account_id: studentData.account_id,
                hashed_pin: hash
            }
            console.log('studentData: ', studentData);
            Student.add(new_student)
            .then(student => {
                console.log('student: ', student);
                Account.findById(student.account_id)
                .then(account => {
                    console.log('account: ', account);
                    let student_ids = account.student_ids || [];
                    student_ids.push(student.student_id);
                    Account.updateById({student_ids: student_ids }, student.account_id)
                    .then(updated_account => {
                        console.log('updated_account: ', updated_account);
                        res.status(201).json(student);
                    })
                    .catch(err => {
                        res.status(500).json({ message: 'Failed to update account list of student IDs.'});
                    })
                })
                .catch (err => {
                    res.status(500).json({ message: 'Error retrieving account for student.', error: err })
                });
            })
            .catch (err => {
                res.status(500).json({ message: 'Failed to add student', error: err });
            });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error retrieving student by req.body.username.', error: err });
    });
});

module.exports = router