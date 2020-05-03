const React = require('react');
const Dom = require('react-dom/server');
const { trackEventLoopDelay, saveEventLoopResults } = require('../measure-event-loop')
const express = require('express')
const app = express()
const port = 7000;

trackEventLoopDelay();

const Component = ({ data }) =>  (
    <html>
        <body>
            <div>
                {data.map(x => (
                    <div id={x}>
                        Item number {x}
                    </div>
                ))}
            </div>
        </body>
    </html>
);

app.get('/render-to-string', (req, res) => {
    const count = parseInt(req.query.count, 0) || 100;
    const items = [...Array(count).keys()];
    const html = Dom.renderToString(<Component data={items} />);
    res.send(html)
});

app.get('/render-to-stream', (req, res) => {
    const count = parseInt(req.query.count, 0) || 100;
    const items = [...Array(count).keys()];
    const html = Dom.renderToNodeStream(<Component data={items} />);
    res.send(html)
});

app.get('/save-event-loop-data', (req, res) => {
    saveEventLoopResults(req.query.file)
    res.send('OK');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))