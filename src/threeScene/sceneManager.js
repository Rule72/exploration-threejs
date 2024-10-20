// This file contains logic for managing the Three.js scene on the server-side

function createDefaultScene() {
  return {
    camera: { position: { x: 0, y: 0, z: 5 } },
    objects: [
      {
        type: 'model',
        path: '/objects/foot.obj',
        position: { x: 0, y: -1, z: 0 },
        rotation: { x: -Math.PI / 2, y: 0, z: 0 },
        scale: { x: 0.02, y: 0.02, z: 0.02 }
      },
      {
        type: 'text',
        text: 'Jake Hopkins',
        position: { x: 0, y: 0, z: -2 },
        rotation: { x: 0, y: 0, z: 0 },
        size: 0.5,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 5
      }
    ],
    lights: [
      // Key light (cyan)
      {
        type: 'pointLight',
        color: 0x00FFFF,
        intensity: 0.8,
        position: { x: 2, y: 3, z: 4 }
      },
      // Fill light (magenta)
      {
        type: 'pointLight',
        color: 0xFF00FF,
        intensity: 0.5,
        position: { x: -2, y: 2, z: -3 }
      },
      // Back light (yellow)
      {
        type: 'pointLight',
        color: 0xFFFF00,
        intensity: 0.4,
        position: { x: 0, y: -3, z: 0 }
      },
      // Rim light 1 (neon green)
      {
        type: 'pointLight',
        color: 0x39FF14,
        intensity: 1.2,
        position: { x: -3, y: 0, z: 3 }
      },
      // Rim light 2 (neon orange)
      {
        type: 'pointLight',
        color: 0xFF6600,
        intensity: 1.2,
        position: { x: 3, y: 0, z: -3 }
      }
    ]
  };
}

module.exports = { createDefaultScene };
