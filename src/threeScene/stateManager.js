const { createDefaultScene } = require('./sceneManager');

async function getSceneState(db, userId) {
  const collection = db.collection('sceneStates');
  let state = await collection.findOne({ userId });
  if (!state) {
    state = { userId, scene: createDefaultScene() };
    await collection.insertOne(state);
  }
  return state.scene;
}

async function updateSceneState(db, userId, newState) {
  const collection = db.collection('sceneStates');
  await collection.updateOne(
    { userId },
    { $set: { scene: newState } },
    { upsert: true }
  );
}

module.exports = { getSceneState, updateSceneState };