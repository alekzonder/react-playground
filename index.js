const express = require('express');
const compression = require('compression');

const config = {
    port: 8080,
};

const app = express();

app.use(compression());

app.use('/static', express.static(`${__dirname}/public/static`));

app.get('/', (req, res) => {
    res.type('html').send(`
        <html>
            <head>
                <link rel="stylesheet" href="/static/vendors/normalize.css">
                <link rel="stylesheet" href="/static/vendors/milligram.min.css">
                <link rel="stylesheet" href="/static/style.css">

            </head>
            <body>
                <div style="margin-top: 10px;" class="container" id="root"></div>
                <script src="/static/app/main.js"></script>
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
            </body>
        </html>
        `);
});

app.listen(config.port, () => {
    console.log(`listen on http://localhost:${config.port}`);
});
