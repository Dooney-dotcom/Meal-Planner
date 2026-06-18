# Meal Planner

[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Meal Planner is an interactive, drag-and-drop enabled web application designed to simplify your weekly meal organization and grocery shopping. Built with React and styled with Tailwind CSS, this app provides a highly responsive and intuitive interface for managing your dietary routine.

Whether you're organizing family dinners, planning a specific diet, or just trying to keep track of your groceries, Meal Planner helps you easily assign meals to specific days and automatically generate shopping lists based on your planned ingredients.

## Key Features

- **Drag & Drop Interface:** Easily organize meals using the intuitive drag-and-drop functionality powered by `@dnd-kit`.
- **Weekly Organization:** Plan meals across a structured weekly view with dedicated slots for different times of the day.
- **Shopping List Generation:** Automatically compile a shopping list based on the ingredients needed for your planned meals.
- **Responsive Design:** Optimized for various screen sizes, ensuring a seamless experience on desktop and mobile.

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system.

### Clone the Repository

```bash
git clone https://github.com/Dooney-dotcom/Meal-Planner.git
cd Meal-Planner
```

### Install Dependencies

This project uses Vite, React, and Tailwind CSS.

```bash
npm install
```

### Run the Development Server

Start the application locally with hot-module replacement:

```bash
npm run dev
```

Open your browser to the URL provided in your terminal (usually `http://localhost:5173`).

### Build for Production

To create a production-ready build:

```bash
npm run build
```

You can preview the built app using:

```bash
npm run preview
```

## Repository Structure

```text
Meal-Planner/
├── .agents/                # Workflow definitions
├── graphify-out/           # Knowledge graph for codebase navigation
├── src/                    # Application source code
│   ├── components/         # React components (DayCard, MealSlot, ShoppingList, etc.)
│   ├── utils/              # Utility functions and mock data
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles and Tailwind configuration
├── index.html              # HTML template
├── package.json            # Project metadata and dependencies
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite configuration
```

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/Dooney-dotcom/Meal-Planner/issues)

When reporting issues, please include:
- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Browser/environment details

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (if applicable).

## Acknowledgements

This project utilizes several fantastic open-source libraries:

- **[React](https://reactjs.org/)** - For building the user interface
- **[Vite](https://vitejs.dev/)** - For lightning-fast frontend tooling
- **[Tailwind CSS](https://tailwindcss.com/)** - For utility-first styling
- **[@dnd-kit](https://dndkit.com/)** - For accessible drag and drop
- **[Lucide React](https://lucide.dev/)** - For beautiful, consistent icons

## Contact

**Dooney-dotcom**

- GitHub: [@Dooney-dotcom](https://github.com/Dooney-dotcom)

Questions, suggestions, or collaboration opportunities? Feel free to open an issue on GitHub.
