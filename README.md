# Cookie Clicker Clone

A fun and engaging Cookie Clicker Clone application built with React, TypeScript, and Axios for managing user data and handling points and prizes.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Description

This project is a simple clone of the popular Cookie Clicker game where users can log in with their unique ID, click a button to earn points, and win prizes based on their actions. The application allows users to:

- Enter a user ID and log in.
- Earn points by clicking a button.
- Receive a prize if they win on a click.
- View their points and prizes in real time.
- Get rewarded with dynamic, visually appealing notifications.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/deshmukhpurushothaman/exponential-frontend.git
   cd exponential-frontend
   ```

2. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed, then run:

   ```bash
   npm install
   ```

3. **Set environment variables**:
   Create a `.env` file in the root directory and add your API URL:
   ```bash
   NEXT_PUBLIC_BASE_API_URL=your-api-url
   ```

## Usage

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. Visit [http://localhost:3000](http://localhost:3000) in your browser.

3. **Login** by entering a user ID. The points and prizes will update each time the button is clicked.

4. Enjoy playing and watching your points grow! 🎉

## Features

- **User Authentication**: Users can log in using their unique user ID.
- **Click-to-Earn Points**: Points are awarded with each click.
- **Prize System**: Users can win a prize after certain actions.
- **Animated Notifications**: Dynamic and visually appealing prize notifications.
- **Responsive Design**: The application is responsive and works on all screen sizes.
- **Modern UI**: Styled with TailwindCSS for a sleek and modern interface.

## Technologies Used

- **React**: The front-end library used for building the UI.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Axios**: For making HTTP requests to the backend API.
- **TailwindCSS**: For responsive and utility-first CSS styling.
- **Framer Motion**: For smooth animations and transitions.
- **Next.js**: A React framework that provides server-side rendering, static site generation, and more.
