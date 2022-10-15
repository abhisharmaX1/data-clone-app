const express = require('express');
const Datastore = require('nedb');
const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log("listening..");
});

const db = new Datastore('database.db');
db.loadDatabase();

app.get('/api', (req, res) => {
    db.find({}, function (err, data) {
        if (err) {
            res.end();
        }
        res.json(data);
    });
})

app.post('/api', (req, res) => {
    const data = req.body;
    console.log(data);
    data.timeStamp = Date.now();
    db.insert(data);
    res.json({
        status: "success",
        latitude: req.body.lat,
        longitude: req.body.lon,
        timeStamp: data.timeStamp,
        image: data.image64
    });
});