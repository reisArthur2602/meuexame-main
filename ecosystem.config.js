module.exports = {
    apps: [
        {
            name: 'meuexame',
            script: 'node_modules/.bin/next',
            args: 'start',
            exec_mode: 'fork',
            instances: 1,
            env: {
                NODE_ENV: 'production',
                PORT: 1011,
            },
        },
    ],
};
