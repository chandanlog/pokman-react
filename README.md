# React Pokemon Listing App

## Overview

The **React Pokemon Listing App** is a web application that allows users to browse, search, and mark Pokemon as favorites. It features infinite scrolling for seamless navigation and efficient state management using React Hooks.

## Features

✅ **Infinite Scrolling** – Dynamically loads more Pokemon as the user scrolls.
✅ **Search Functionality** – Search Pokemon by name with a debounced input.
✅ **Favorite Toggle** – Mark and unmark Pokemon as favorites.
✅ **Optimized Performance** – Utilizes `useReducer`, `useEffect`, `useCallback`, and `useMemo` for enhanced performance.
✅ **Responsive Design** – Ensures a smooth experience across different screen sizes.

## Tech Stack

- **Frontend:** React, React Hooks (useReducer, useEffect, useCallback, useMemo)
- **Styling:** CSS
- **Icons:** React Icons
- **API:** [Express Pokemon API](https://pokemon-api-agde.onrender.com/)

## Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and configure the API URL:

```env
VITE_API_BASE_URL=https://pokemon-api-agde.onrender.com/api/v1
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

The application will be available at:

```bash
https://pokman-react.vercel.app
```

## How It Works

1. **Fetching Data** – The app fetches Pokemon data from the API and stores it in the state.
2. **Infinite Scroll** – The `Listing` component dynamically loads more Pokemon when the user scrolls down.
3. **Search & Filter** – The `Search` component filters Pokemon by name and displays only favorite ones if selected.
4. **Favorite Toggle** – Clicking the heart icon marks/unmarks a Pokemon as a favorite and updates the backend.

## Deployment

To deploy the project, build it using:

```bash
npm run build
```

Then, host it using Vercel hosting provider.

## API Documentation

To explore the API endpoints, visit the Swagger documentation:

```bash
https://pokemon-api-sx3h.onrender.com/api-docs
```

## Contributing

Feel free to contribute by submitting issues or creating pull requests. Make sure to follow best practices for clean and maintainable code.

## License

This project is open-source and available under the [MIT License](LICENSE).

