# Three.js Exploration Microservice

This project is a microservice that uses Three.js, MongoDB, and Vite to create an interactive 3D scene that can be manipulated and persisted.

## Prerequisites

- Node.js (v14 or later)
- Docker and Docker Compose
- npm or yarn

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/exploration-threejs.git
   cd exploration-threejs
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

### Development Mode

1. Start the MongoDB container:
   ```
   docker-compose up mongo
   ```

2. In a new terminal, start the Vite development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Production Mode

1. Build the application:
   ```
   npm run build
   ```

2. Start the entire stack using Docker Compose:
   ```
   docker-compose up --build
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `src/`: Contains the front-end code
  - `index.html`: Main HTML file
  - `main.js`: Entry point for the front-end application
  - `style.css`: Global styles
  - `client/`: Client-side JavaScript files
  - `threeScene/`: Server-side Three.js scene management
- `server.js`: Express server and WebSocket setup
- `vite.config.js`: Vite configuration
- `Dockerfile`: Instructions for building the Docker image
- `docker-compose.yaml`: Defines the multi-container Docker application

## Development

- To add new 3D objects or modify the scene, edit `src/main.js` and `src/threeScene/sceneManager.js`
- To change the server-side logic, modify `server.js` and files in `src/`
- To update the database schema or queries, edit `src/database.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
