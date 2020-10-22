const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// get request for /exercises leads to here
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises)) // return exercises as json
    .catch(err => res.status(400).json('Error: ' + err));
});

// post request for /exercises/add and adds all necessary fields
router.route('/add').post((req, res) => {
  const description = req.body.description;
  const weight = Number(req.body.weight);
  const reps = Number(req.body.reps);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    description,
    weight,
    reps,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET SINGLE EXERCISE AND DELETE SINGLE EXERCISE
// id is a variable that is created by MongoDb
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => { // exercise we just got from database and set to new exercise
      exercise.description = req.body.description;
      exercise.weight = Number(req.body.weight);
      exercise.reps = Number(req.body.reps);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;