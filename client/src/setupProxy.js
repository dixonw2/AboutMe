const { createProxyMiddleware } = require("http-proxy-middleware");

const target = "http://localhost:8000"; // FastAPI default port
console.log(`Proxying requests to: ${target}`);

// Add whatever FastAPI routes you want to proxy here
const context = ["/api"];

const onError = (err, req, res, target) => {
  console.error(`Proxy error: ${err.message}`);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("Proxy error. Check if the FastAPI server is running.");
};

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    changeOrigin: true,
    onError: onError,
    secure: false, // set to true if using HTTPS
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};
