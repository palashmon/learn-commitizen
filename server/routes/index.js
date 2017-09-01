const express = require('express');
const router = express.Router();
const Blob = require('../models/blob');

router.get('/', (req, res, next) => {
    res.send('Hello, World!');
});

// *** get ALL blobs *** //
function findAllBlobs(req, res) {
    Blob.find((err, blobs) => {
        if (err) {
            res.json({ ERROR: err });
        } else {
            res.json(blobs);
        }
    });
}

// *** get SINGLE blobs *** //
function findBlobById(req, res) {
    Blob.findById(req.params.id, (err, blob) => {
        if (err) {
            res.json({ ERROR: err });
        } else {
            res.json(blob);
        }
    });
}

// *** post ALL blobs *** //
function addBlob(req, res) {
    const newBlob = new Blob({
        name: req.body.name,
        lastName: req.body.lastName
    });
    newBlob.save(err => {
        if (err) {
            res.json({ ERROR: err });
        } else {
            res.json({ SUCCESS: newBlob });
        }
    });
}

// *** put SINGLE blob *** //
function updateBlob(req, res) {
    Blob.findById(req.params.id, (err, blob) => {
        blob.name = req.body.name;
        blob.lastName = req.body.lastName;
        blob.save(saveErr => {
            if (saveErr) {
                res.json({ ERROR: saveErr });
            } else {
                res.json({ UPDATED: blob });
            }
        });
    });
}

// *** delete SINGLE blob *** //
function deleteBlob(req, res) {
    Blob.findById(req.params.id, (err, blob) => {
        if (err) {
            res.json({ ERROR: err });
        } else {
            blob.remove(removeErr => {
                if (removeErr) {
                    res.json({ ERROR: removeErr });
                } else {
                    res.json({ REMOVED: blob });
                }
            });
        }
    });
}

// *** api routes *** //
router.get('/blobs', findAllBlobs);
router.get('/blob/:id', findBlobById);
router.post('/blobs', addBlob);
router.put('/blob/:id', updateBlob);
router.delete('/blob/:id', deleteBlob);

module.exports = router;
