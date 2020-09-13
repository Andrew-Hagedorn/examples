const React = require('react');
const Dom = require('react-dom/server');
const { trackEventLoopDelay, saveEventLoopResults } = require('../measure-event-loop')
const Component = require('./component');
const { Worker } = require('worker_threads');
const express = require('express')
const { StaticPool } = require('node-worker-threads-pool');
const app = express()
const port = 7000;
const workerFileName = process.cwd() + '/dist/worker.js';

trackEventLoopDelay();

const data = [...Array(1000).keys()];

app.get('/render-to-string', (req, res) => {
    const html = Dom.renderToString(<Component data={data} />);
    res.send(html)
});

app.get('/render-to-stream', (req, res) => {
    const stream = Dom.renderToNodeStream(<Component data={data} />);
    stream.on('error', e => {  /* handle the error */ });
    stream.pipe(res);
});

const pool = new StaticPool({
    size: 10,
    task: process.cwd() + '/dist/worker.js',
    workerData: '',
    shareEnv: true,
});

app.get('/render-in-worker', (req, res) => {
    pool.exec({
        data
    }).then(result => res.send(result));
});

app.get('/save-event-loop-data', (req, res) => {
    saveEventLoopResults(req.query.file)
    res.send('OK');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))