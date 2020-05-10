const React = require('react');
const Dom = require('react-dom/server');
const Component = require('./component');
const { parentPort } = require('worker_threads');

parentPort.on('message', function(data, callback) {
    const html = Dom.renderToString(<Component data={data} />);
    parentPort.postMessage(html);
});

