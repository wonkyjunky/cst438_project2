const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app)
{
    app.use(createProxyMiddleware("/test", { target: "http://localhost:5000" }));
	app.use(createProxyMiddleware("/item", { target: "http://localhost:5000" }));
	app.use(createProxyMiddleware("/list", { target: "http://localhost:5000" }));
	app.use(createProxyMiddleware("/user", { target: "http://localhost:5000" }));
	app.use(createProxyMiddleware("/shaq", { target: "http://localhost:5000" }));
};