const router = require('express').Router();
let Expenses = require('../models/expenses.model');
//first endpoint
router.route('/').get((req, res) => {
    Expenses.find()
        .then(expenses => res.json(expenses)) //return all expenses
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});
//second endpoint
router.route('/add').post((req, res) => { //add entry 
    const title = req.body.title;
    const price = Number(req.body.price);
    const duedate = Date.parse(req.body.duedate);
    const period = req.body.period;

    const newExpenses = new Expenses({
        title,
        price,
        duedate,
        period,
    });

    newExpenses.save()
        .then(() => res.json('Expense added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { //retrieves entry
    Expenses.findById(req.params.id)
        .then(expenses => res.json(expenses)) //return expense
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});
 
router.route('/:id').delete((req, res) => { //deletes entry
    Expenses.findByIdAndDelete(req.params.id)
        .then(expenses => res.json('Expense deleted')) //deletes expense
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});

router.route('/update/:id').post((req, res) => { //update entry
    Expenses.findById(req.params.id)
        .then(expenses => {
            expenses.title = req.body.title;
            expenses.price = req.body.price;
            expenses.duedate = req.body.duedate;
            expenses.period = req.body.period;
            expenses.save()
                .then(() => res.json('Expense updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;