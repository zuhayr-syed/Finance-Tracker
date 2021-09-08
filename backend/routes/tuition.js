const router = require('express').Router();
let Tuition = require('../models/tuition.model');
//first endpoint
router.route('/').get((req, res) => {
    Tuition.find()
        .then(tuition => res.json(tuition)) //return all tuition
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});
//second endpoint
router.route('/add').post((req, res) => { //add entry
    const title = req.body.title;
    const price = Number(req.body.price);
    const duedate = Date.parse(req.body.duedate);

    const newTuition = new Tuition({
        title,
        price,
        duedate,
    });

    newTuition.save()
        .then(() => res.json('Tuition added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => { //retrieves entry
    Tuition.findById(req.params.id)
        .then(tuition => res.json(tuition)) //return tuition
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});
 
router.route('/:id').delete((req, res) => { //deletes entry
    Tuition.findByIdAndDelete(req.params.id)
        .then(tuition => res.json('Tuition deleted')) //deletes tuition
        .catch(err => res.status(400).json('Error: ' + err)); //if error, return error
});

router.route('/update/:id').post((req, res) => { //update entry
    Tuition.findById(req.params.id)
        .then(tuition => {
            tuition.title = req.body.title;
            tuition.price = req.body.price;
            tuition.duedate = req.body.duedate;
            tuition.save()
                .then(() => res.json('Tuition updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;