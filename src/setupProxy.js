const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app)
{
    app.use(createProxyMiddleware("/api/test", { target: "http://localhost:8000" }));
	app.use(createProxyMiddleware("/api/item", { target: "http://localhost:8000" }));
	app.use(createProxyMiddleware("/api/list", { target: "http://localhost:8000" }));
	app.use(createProxyMiddleware("/api/user", { target: "http://localhost:8000" }));
	app.use(createProxyMiddleware("/api/shaq", { target: "http://localhost:8000" }));
};