const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000" ,
      // target: process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://www.teeskitchen.com",
      changeOrigin: true,
    }),
  );
};



