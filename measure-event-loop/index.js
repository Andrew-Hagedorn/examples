const fs = require('fs');
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


module.exports = {
    trackEventLoopDelay,
    saveEventLoopResults: function(file) {
        const data = JSON.stringify(eventLoopMeasurement, null, 2);

        if (!fs.existsSync('./data')) {
            fs.mkdirSync('./data')
        }

        fs.writeFileSync(`./data/${file}-eventloop.json`, data);
        eventLoopMeasurement = [];
    }
}