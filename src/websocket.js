const WebSocket = require('ws');
const { getDb } = require('./database');
const { updateSceneState } = require('./threeScene/stateManager');

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', async (message) => {
      const data = JSON.parse(message);
      const db = getDb();
      await updateSceneState(db, data.userId, data.sceneState);
      ws.send(JSON.stringify({ type: 'stateUpdated', data: data.sceneState }));
    });
  });
}

module.exports = { initWebSocket };