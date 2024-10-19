const express = require('express');
const http = require('http');
const path = require('path');
const { initWebSocket } = require('./websocket');
const { connectToDatabase } = require('./database');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, '../public')));

async function startServer() {
  await connectToDatabase();
  initWebSocket(server);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer().catch(console.error);