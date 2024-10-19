// This file would contain logic for managing the Three.js scene on the server-side
// For this example, we'll just include a placeholder function

function createDefaultScene() {
    return {
      camera: { position: { x: 0, y: 0, z: 5 } },
      objects: [
        { type: 'cube', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 } }
      ]
    };
  }
  
  module.exports = { createDefaultScene };