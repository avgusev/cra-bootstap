// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api-geoserver',
    createProxyMiddleware({
      target: 'http://172.19.22.106:8080/geoserver',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '/api-geoserver': '/',
      },
    })
  );
};
