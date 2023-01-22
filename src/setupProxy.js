const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    ['/course', '/auth', '/user', '/application', '/notice'],
    createProxyMiddleware({
      target: 'https://web-document-application.onrender.com/api/v1/',
      changeOrigin: true,
    })
  );
};