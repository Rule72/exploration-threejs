const express = require('express');
const http = require('http');
const path = require('path');
const { initWebSocket } = require('./src/websocket');
const { connectToDatabase } = require('./src/database');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'dist')));

async function startServer() {
  await connectToDatabase();
  initWebSocket(server);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer().catch(console.error);
