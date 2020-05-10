const React = require('react');

module.exports = ({ data }) =>  (
    <html>
        <body>
            <div>
                {data.map(x => (
                    <div key={x}>
                        Item number {x}
                    </div>
                ))}
            </div>
        </body>
    </html>
);