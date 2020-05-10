const React = require('react');
const Dom = require('react-dom/server');
const { trackEventLoopDelay, saveEventLoopResults } = require('../measure-event-loop')
const Component = require('./component');
const { Worker } = require('worker_threads');
const express = require('express')

const app = express()
const port = 7000;
const workerFileName = process.cwd() + '/dist/worker.js';

trackEventLoopDelay();

app.get('/render-to-string', (req, res) => {
    const count = parseInt(req.query.count, 0) || 100;
    const data = [...Array(count).keys()];
    const html = Dom.renderToString(<Component data={data} />);
    res.send(html)
});

app.get('/render-to-stream', (req, res) => {
    const count = parseInt(req.query.count, 0) || 100;
    const data = [...Array(count).keys()];
    const stream = Dom.renderToNodeStream(<Component data={data} />);
    stream.on('error', e => {  /* handle the error */ });
    stream.pipe(res);
});

app.get('/render-in-worker', (req, res) => {
    const count = parseInt(req.query.count, 0) || 100;
    const data = [...Array(count).keys()];
    
    // in practice use a thread pool
    const worker = new Worker(workerFileName);
    worker.postMessage(data)

    worker.on('message', html => res.send(html));
    worker.on('error', err => res.send(err));
});

app.get('/save-event-loop-data', (req, res) => {
    saveEventLoopResults(req.query.file)
    res.send('OK');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))