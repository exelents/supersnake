# SuperSnake

SuperSnake is a modern rendition of the classic Snake game. You control the snake on a block-wise field, guiding it to eat apples and grow longer. The game ends when the snake crashes into the window border or its own tail. The game tracks the score (number of apples eaten) and the time elapsed from the game start. At the end of the game, the top 5 high scores are displayed and stored in a text file in the game's directory.

## Overview

SuperSnake is a frontend-focused application with the primary logic and rendering happening in the browser using JavaScript and HTML5 Canvas. The high score table is stored in a text file on the server, which is managed by a simple Node.js server. The frontend handles user interactions, game logic, and rendering, while the backend manages high score data persistence.

### Technologies Used

- **Node.js**: JavaScript runtime for building the app.
- **Express**: Web server framework for Node.js.
- **Bootstrap**: Front-end framework for developing responsive, mobile-first projects on the web.

### Project Structure

- `package.json`: Configuration file for the Node.js project.
- `app.js`: Sets up a basic Express.js server.
- `public/index.html`: Main HTML file for the SuperSnake web application.
- `public/css/styles.css`: CSS stylesheet for the game's appearance and layout.
- `public/js/scripts.js`: JavaScript file responsible for the game logic and rendering.
- `README.md`: Provides an overview and instructions for the SuperSnake project.

## Features

- **Snake Control**: Navigate the snake using arrow keys.
- **Apple Consumption**: The snake grows longer each time it eats an apple.
- **Collision Detection**: The game ends if the snake collides with the window border or its own tail.
- **Score Tracking**: Displays the number of apples eaten.
- **Timer**: Tracks and displays the time elapsed from the start of the game.
- **High Score Table**: Displays the top 5 high scores at the end of the game, stored in a text file.

## Getting started

### Requirements

- Node.js (version 14.x or later)
- npm (Node Package Manager)

### Quickstart

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd supersnake
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   node app.js
   ```

4. **Access the game**:
   Open your web browser and navigate to `http://localhost:3000`.

### License

GPLv3

#### This game is written by [GPT-Pilot](https://github.com/Pythagora-io/gpt-pilot)

