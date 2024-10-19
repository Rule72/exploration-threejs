let scene, camera, renderer, cube;
let ws;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeJsCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    ws = new WebSocket('ws://' + window.location.host);
    ws.onmessage = onWebSocketMessage;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    sendState();
}

function sendState() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            userId: 'user123', // In a real app, this would be a proper user ID
            sceneState: {
                cubeRotation: { x: cube.rotation.x, y: cube.rotation.y }
            }
        }));
    }
}

function onWebSocketMessage(event) {
    const data = JSON.parse(event.data);
    if (data.type === 'stateUpdated') {
        // Update the scene based on the received state
        // This is a simplified example; you'd have more complex state management in a real app
        cube.rotation.x = data.data.cubeRotation.x;
        cube.rotation.y = data.data.cubeRotation.y;
    }
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();