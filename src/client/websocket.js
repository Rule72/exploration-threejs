function initWebSocket() {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'stateUpdated') {
            updateScene(data.data);
        }
    };

    return socket;
}

function updateScene(sceneState) {
    // Update the Three.js scene based on the received state
    console.log('Updating scene:', sceneState);
}

export { initWebSocket };
