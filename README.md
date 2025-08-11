# Clarity.AI

A mobile application developed with React Native that acts as an AI-powered coding and study assistant. It provides clear explanations of concepts and generates code snippets using the Gemini 1.5 Flash API.

## Features

* **AI-Powered Responses**: Utilizes the Gemini 1.5 Flash API to provide detailed and accurate answers to coding and study-related questions.
* **Markdown Rendering**: Displays formatted AI responses with rich text, code blocks, and lists for easy readability.
* **Modern UI**: A clean, dark-themed user interface built with React Native for a great user experience.
* **Cross-Platform**: The app is built to run on both iOS and Android devices.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS version)
* A code editor (e.g., VS Code)
* A Gemini 1.5 Flash API Key (available from [Google AI Studio](https://aistudio.google.com))

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ridam-Mittal/Clarity.AI.git
   cd Clarity.AI
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Gemini API key:

   ```
   GEMINI_API_KEY="your_api_key_here"
   ```
4. Run the application:

   ```bash
   npm start
   ```

   This will start the Expo development server. You can scan the QR code with your phone using the Expo Go app or run it on an emulator.

## Code

The main application logic and UI are contained within a single `App.js` file. The app is structured around functional components and uses React Hooks for state management. The key API call to Gemini is handled asynchronously within a `handleGenerate` function.

## Technologies Used

* React Native - The cross-platform framework
* Google Generative AI SDK - For integrating the Gemini API
* react-native-markdown-display - For rendering Markdown content
* ESLint & Prettier - For code linting and formatting
