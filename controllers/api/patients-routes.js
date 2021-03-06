const router = require('express').Router();
// const sequelize = require('../../config/connection');
const { Patients } = require('../../models');

// get all patients
router.get('/', (req, res) => {
    Patients.findAll()
        .then(dbPatientData => res.json(dbPatientData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// post patient
router.post('/', (req, res) => {
    Patients.create({
        PatientName: req.body.PatientName,
        PatientStatus: req.body.PatientStatus,
        PatientType: req.body.PatientType,
        prescription: req.body.prescription,
        diagnosis: req.body.diagnosis,
        reports: req.body.reports,
        isVaccinated: req.body.isVaccinated
    })
    .then(dbPatientData => { 
        res.json(dbPatientData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
    Patients.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbPatientData => {
            if(!dbPatientData){
                res.status(404).json({ message: 'No patient found with this id'})
                return;
            }
            res.json(dbPatientData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', (req, res) => {
    
    Patients.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(dbPatientData => {
        if (!dbPatientData) {
          res.status(404).json({ message: 'No patient found with this id' });
          return;
        }
        res.json(dbPatientData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
module.exports = router;