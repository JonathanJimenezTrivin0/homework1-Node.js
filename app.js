const http = require("http");

function startServer() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("¡Hola, Jonathan!\n");
  });

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
  });
}

module.exports = {
  startServer,
};
