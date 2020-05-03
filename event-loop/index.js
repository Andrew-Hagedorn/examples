const express = require('express')
const fs = require('fs');
const app = express()
const port = 7000;
const sampleRate = 50;

let eventLoopMeasurement = [];
function trackEventLoopDelay() {
    const start = new Date()
    setTimeout(() => {
        const delay = new Date() - start;
        eventLoopMeasurement.push(delay - sampleRate);
        trackEventLoopDelay();
    }, sampleRate)
}

trackEventLoopDelay();

app.get('/no-processing', (req, res) => res.send('OK'));

app.get('/processing', (req, res) => {
    const delay = parseInt(req.query.delay || '1000', 10);
    const now = new Date().getTime();

    while(new Date().getTime() < now + delay) {
        ; // spin and block the event loop; you should never do this in real life...
    }

    res.send('OK');
});

app.get('/save-event-loop-data', (req, res) => {
    const data = JSON.stringify(eventLoopMeasurement, null, 2);
    fs.writeFileSync(`./data/${req.query.file}-eventloop.json`, data);
    eventLoopMeasurement = [];
    res.send('OK');
});

app.listen(port, () => console.log(`Event look application is listening at http://localhost:${port}`))