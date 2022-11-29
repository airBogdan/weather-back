var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const StationsModel = require('./../db/stationsSchema');
dotenv.config();

const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

router.get('/', async function (req, res, next) {
    const data = await StationsModel.find({})
    res.send({ data });
});

router.post('/', async function (req, res, next) {
    const fields = ['external_id', 'name', 'latitude', 'longitude', 'altitude'];
    let allExist = true;

    fields.forEach(field => {
        if (!(field in req.body)) allExist = false;
    })

    if (allExist) {
        let hasError = false;
        await StationsModel.create(req.body, function (err, awesome_instance) {
            if (err) hasError = true

            if (!hasError) res.send({ success: true });
            else res.send({ error: true })
        });
    }
    else res.send({ error: true })
});

router.delete('/', async function (req, res, next) {
    const { external_id } = req.body;
    const { deletedCount } = await StationsModel.deleteOne({ external_id });

    if (deletedCount > 0) res.send({ success: true });
    else res.send({ error: true });
});

module.exports = router;
