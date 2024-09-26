🔍 Lost and Found API
Brief Description:
This project is a Lost and Found API system that allows users to report and retrieve lost/found items. It provides secure user registration, authentication, and item report management, all backed by MongoDB. This project is developed by the Google Developer Student Club at USF.

📑 Table of Contents
Project Overview
Features
Getting Started
Installation
Usage
Configuration
Contributing
License
Contact
📜 Project Overview
The Lost and Found API is designed to allow users to report lost or found items on a centralized platform. Users can register, log in, and manage their lost or found reports. Authentication is handled using JWT tokens for secure access, while the data is stored using MongoDB. This project is ideal for universities or community groups looking for a platform to track lost and found items.

🌟 Features
User Registration & Authentication: Users can sign up and log in securely. Passwords are hashed, and authentication is handled via JWT tokens.
Lost/Found Item Reports: Users can create, retrieve, and filter lost or found items based on specific criteria (e.g., status, location).
JWT-Protected Routes: Ensure that only authenticated users can report new items.
Efficient Searching: Items can be searched using filters like item name, status, and found/deposit location.
Error Handling: Comprehensive error-handling middleware for better debugging and user feedback.
🚀 Getting Started
To get started with the project, ensure that you have the necessary prerequisites installed. Follow the installation steps below to set up and run the project.

Prerequisites
Node.js (version 14.x or later)
MongoDB instance (local or cloud, e.g., MongoDB Atlas)
Git
dotenv library to manage environment variables
⚙️ Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/lost-and-found-api.git
cd lost-and-found-api
Install dependencies:

bash
Copy code
npm install
Set up environment variables:
Create a .env file in the root directory of your project and add the following variables:

bash
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
Start the API Server:
To run the server, first start the API by running the following command:

bash
Copy code
node server.js
This will run the server on http://localhost:3000.

🧑‍💻 Usage
Endpoints
POST /api/register
Register a new user.
Request Body:

json
Copy code
{
  "uNumber": "U12345",
  "email": "user@example.com",
  "password": "your_password"
}
POST /api/login
Log in a user and receive a JWT token.
Request Body:

json
Copy code
{
  "uNumber": "U12345",
  "password": "your_password"
}
POST /api/items (JWT required)
Report a new lost/found item.
Request Body:

json
Copy code
{
  "itemName": "Backpack",
  "description": "Blue backpack with laptop",
  "status": "lost",
  "foundLocation": "Library",
  "depositLocation": "Front Desk"
}
GET /api/items
Retrieve all reported items with optional filtering (e.g., by status, item name, location).
Query Params (optional):

status: "lost" or "found"
foundLocation: String
itemName: String
GET /api/items/

Retrieve specific item details by ID.

⚙️ Configuration
The app relies on a .env file to configure important settings. You can use the following keys:

MONGO_URI: The MongoDB connection string (e.g., from MongoDB Atlas).
JWT_SECRET: A secret string used to sign JWT tokens for user authentication.
To configure the environment, copy the .env.example file to .env and replace the placeholders with actual values.

🤝 Contributing
We welcome contributions! Here's how you can help:

Fork the project.
Create a new branch for your feature or bugfix:
bash
Copy code
git checkout -b feature/your-feature
Commit your changes:
bash
Copy code
git commit -m "Add some feature"
Push your changes to the branch:
bash
Copy code
git push origin feature/your-feature
Open a Pull Request on the main repository.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

📧 Contact
For questions or contributions, please contact:

Project Lead: Google Developer Student Club @ USF
Email: gdsccs@gmail.com
GitHub: GDSC USF
