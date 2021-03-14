const { createProxyMiddleware } = require('http-proxy-middleware');

const API_SERVER_ADDRESS = (process.env.IP || "localhost:") + (process.env.PORT || 8000);

module.exports = function(app)
{
	console.log("Creating proxies to: ", API_SERVER_ADDRESS);
    app.use(createProxyMiddleware("/api/test", { target: API_SERVER_ADDRESS }));
	app.use(createProxyMiddleware("/api/item", { target: API_SERVER_ADDRESS }));
	app.use(createProxyMiddleware("/api/list", { target: API_SERVER_ADDRESS }));
	app.use(createProxyMiddleware("/api/user", { target: API_SERVER_ADDRESS }));
	app.use(createProxyMiddleware("/api/shaq", { target: API_SERVER_ADDRESS }));
};