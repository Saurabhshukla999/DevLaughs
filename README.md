# 😄 Jokefy - MERN Stack Joke Application

A simple web application where users can post and read jokes, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- ✅ Post new jokes with author attribution
- ✅ View all posted jokes
- ✅ Real-time updates after posting
- ✅ Responsive design
- ✅ Error handling and loading states

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with:
```
MONGO_URI=mongodb://localhost:27017/jokefy
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Database Setup

Make sure MongoDB is running on your system. The application will automatically create a database called `jokefy` and a collection called `jokes`.

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Fill in your name and joke in the form
3. Click "Post Joke" to submit
4. View all posted jokes below the form
5. Jokes are displayed with the most recent first

## API Endpoints

- `GET /` - Fetch all jokes
- `POST /jokes` - Create a new joke (requires `joke` and `author` in request body)

## Project Structure

```
mern-stack/
├── backend/
│   ├── server.js          # Express server with MongoDB connection
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables (create this)
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   └── main.jsx      # React entry point
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── README.md             # This file
```

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running and the connection string in `.env` is correct
- **Port Already in Use**: Change the PORT in `.env` if 5000 is occupied
- **CORS Issues**: The backend is configured to allow all origins for development

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React 19, Vite, Axios
- **Database**: MongoDB
- **Styling**: Inline CSS for simplicity
