# Tiles Game

[Live Demo](https://tiles4now-game.vercel.app/)

## Project Description

Tiles Game is a classic memory matching game where the objective is to find pairs of tiles with the same color. The game board consists of tiles that are initially covered. The player needs to uncover two tiles at a time to find matching pairs. The game continues until all pairs are found and all tiles are uncovered.

## Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Frontend**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Features

1. **Game Board**: The game board consists of tiles arranged in a 4x4 grid by default.
   - Each pair of tiles has the same image.
   - All tiles are initially covered, hiding their colors/images.

2. **Gameplay**: The game is played in rounds.
   - In each round, the player selects two tiles to uncover.
   - If the selected tiles have the same color, they remain uncovered.
   - If the selected tiles have different colors, they are covered again.
   - The game ends when all pairs are found and all tiles are uncovered.

## Browsers

This application is compatible with the latest versions of Chrome, Safari, and Firefox.

## Installation and Setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Development

To run the project in development mode:

1. Clone the repository:
    ```bash
    git clone https://github.com/aveok4now/4tilesgame.git
    ```
2. Navigate to the project directory:
    ```bash
    cd 4tilesgame
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and go to `http://localhost:3000`.

### Build

To build the project for production:

1. Run the build command:
    ```bash
    npm run build
    ```
2. The built files will be in the `dist` directory. You can deploy these files to any static hosting service.

## Deployment

The application is deployed using GitHub Pages. To deploy the application:

1. Build the project:
    ```bash
    npm run build
    ```
2. Deploy the `dist` directory to GitHub Pages:
    ```bash
    npm run deploy
    ```

## Contributing

Feel free to fork the project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

---

For more information on how to use Tailwind CSS with React and Astro, please refer to their respective documentation:

- [Tailwind CSS](https://tailwindcss.com/docs)
- [React](https://reactjs.org/docs/getting-started.html)
- [Astro](https://docs.astro.build/)
