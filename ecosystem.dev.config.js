const name = 'react';
const cwd = process.cwd();

module.exports = {
    apps: [
        {
            name: `${name}-webpack`,
            cwd,
            script: './node_modules/.bin/webpack',
            args: ['--watch'],
        },
        {
            name,
            cwd,
            script: 'index.js',
        },
    ],
};
