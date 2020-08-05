
module.exports = {
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: (config) => {
        config.plugin('define').tap((definitions) => {
            let env = definitions[0]['process.env'];
            definitions[0]['process.env'] = {
                ...env,
                BCE_AK: JSON.stringify(process.env.BCE_AK),
                BCE_SK: JSON.stringify(process.env.BCE_SK),
                BCE_ST: JSON.stringify(process.env.BCE_ST),
                BOS_BUCKET: JSON.stringify(process.env.BOS_BUCKET),
            };
            return definitions;
        });
    },
};
