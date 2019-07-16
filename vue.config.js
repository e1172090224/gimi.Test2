module.exports = {
    devServer: {
        proxy: {
            '/apis':{
                pathRewrite: { '^/apis': '' },
                target: 'http://api-sale.t.xgimi.com', // 访问数据的计算机域名
                changOrigin: true
            }
        },
        disableHostCheck: true,
    }
};
