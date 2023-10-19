const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // This is the address where your Flask app is running.
      changeOrigin: true,
    })
  );
};
