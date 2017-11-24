let express = require('express');
let compression = require('compression');

let config = {
    port: 8080
};

let app = express();

app.use(compression());

app.use('/static', express.static(__dirname + '/public/static'));

app.get('/', (req, res) => {
    res.type('html').send(
        `
        <html>
            <head>

            </head>
            <body>
                <div id="root"></div>
                <div id="root1"></div>
                <script src="/static/main.js"></script>
            </body>
        </html>
        `
    );
});

app.listen(config.port, () => {
    console.log(`listen on http://localhost:${config.port}`);
});
