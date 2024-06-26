const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/auth', createProxyMiddleware({
    target: 'http://54.227.62.100:4999',
    changeOrigin: true,
    secure: false
  }));
};