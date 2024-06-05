## Project Setup and Running Locally

This project uses the MERN (MongoDB, Express.js, React.js, Node.js) stack. Follow the steps below to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB (local installation or a MongoDB Atlas account)

### Step-by-Step Guide

1. **Clone the repository**

   ```bash
   git clone https://github.com/therajusah/ToDo-MERN.git
   cd ToDo-MERN
   ```

2. **Set up environment variables**

   Create a `.env` file in the root directory of the project and add the following environment variables. Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string.

   ```bash
   # .env
   MONGO_URI=<your_mongodb_connection_string>
   PORT=1000
   ```

3. **Install backend dependencies**

   ```bash
   npm install
   ```

4. **Run the backend server**

   ```bash
   npm start
   ```

   This will start the backend server on `http://localhost:1000`.

5. **Set up the frontend**

   Open another terminal and navigate to the frontend directory.

   ```bash
   cd backend/frontend
   npm install
   ```

6. **Run the frontend development server**

   ```bash
   npm start
   ```

   This will start the frontend development server on `http://localhost:3000`.

### Folder Structure

```plaintext
ToDo-MERN/
├── backend/             # Backend code (Node.js, Express)
│   ├── connection/      # MongoDB connection handling
│   ├── frontend/        # Frontend code (React.js)
│   │   ├── public/      # Public files
│   │   ├── src/         # Source files
│   │   ├── package.json # Frontend dependencies
│   │   └── ...          # Other frontend files
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── .env             # Environment variables (create this file)
│   ├── app.js           # Entry point for the backend server
│   └── ...              # Other backend files
├── README.md            # Project documentation
└── ...                  # Other project files
```

### Additional Notes

- Ensure your MongoDB server is running, or you have correctly set up your MongoDB Atlas connection.
- For development purposes, the backend server runs on `http://localhost:1000` and the frontend server runs on `http://localhost:3000`.

### Troubleshooting

- If you happen to have issues with CORS, please make sure your backend server is configured to accept requests from your front end.
- Check that all necessary environment variables are correctly set in the `.env` file.
