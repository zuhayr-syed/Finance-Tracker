const router = require('express').Router();
let Loans = require('../models/loans.model');
//first endpoint
router.route('/').get((req, res) => {
    Loans.find()
        .then(loans => res.json(loans)) //return all loans
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});
//second endpoint
router.route('/add').post((req, res) => { //add entry
    const title = req.body.title;
    const price = Number(req.body.price);
    const duedate = Date.parse(req.body.duedate);
    const interest = req.body.interest;

    const newLoans = new Loans({
        title,
        price,
        duedate,
        interest,
    });

    newLoans.save()
        .then(() => res.json('Loan added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { //retrieves entry
    Loans.findById(req.params.id)
        .then(loans => res.json(loans)) //return loan
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});
 
router.route('/:id').delete((req, res) => { //deletes entry
    Loans.findByIdAndDelete(req.params.id)
        .then(loans => res.json('Loan deleted')) //deletes loan
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});

router.route('/update/:id').post((req, res) => { //update entry
    Loans.findById(req.params.id)
        .then(loans => {
            loans.title = req.body.title;
            loans.price = req.body.price;
            loans.duedate = req.body.duedate;
            loans.interest = req.body.interest;
            loans.save()
                .then(() => res.json('Loan updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;