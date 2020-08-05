module.exports = {
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: false,
            loose: true
        }]
    ],
    plugins: ['lodash']
};
