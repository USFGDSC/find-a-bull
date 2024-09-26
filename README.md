# 🔍 Lost and Found API
Welcome to the ultimate lost and found management system for your community! This API, developed by the Google Developer Student Club at USF, empowers users to report and retrieve lost or found items with ease and security.
## 🌟 Key Features

### 🔐 Secure User Management: Register and authenticate users with robust security measures, including password hashing and JWT token authentication.
### 📝 Effortless Item Reporting: Users can create, retrieve, and filter lost or found items based on specific criteria like status and location.
### 🔒 Protected Routes: Ensure data integrity with JWT-protected routes for reporting new items.
### 🔎 Smart Search Functionality: Easily find items using filters such as item name, status, and location.
### 🛠 Comprehensive Error Handling: Debug with ease and provide clear feedback to users with our error-handling middleware.

## 🚀 Getting Started
###Prerequisites

- Node.js (version 14.x or later)
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- Git
- dotenv library for environment variable management

## ⚙️ Installation

- Clone the repository:
bashCopygit clone https://github.com/your-username/lost-and-found-api.git
cd lost-and-found-api

- Install dependencies:
bashCopynpm install

- Set up environment variables:
Create a .env file in the root directory with the following:
CopyMONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt

- Start the API Server:
bashCopynode server.js
The server will run on http://localhost:3000.

## 🧑‍💻 Usage
- Endpoints

POST /api/register: Register a new user
jsonCopy{
  "uNumber": "U12345",
  "email": "user@example.com",
  "password": "your_password"
}

POST /api/login: Log in and receive a JWT token
jsonCopy{
  "uNumber": "U12345",
  "password": "your_password"
}

POST /api/items (JWT required): Report a new lost/found item
jsonCopy{
  "itemName": "Backpack",
  "description": "Blue backpack with laptop",
  "status": "lost",
  "foundLocation": "Library",
  "depositLocation": "Front Desk"
}

GET /api/items: Retrieve all reported items (with optional filtering)
Query Params: status, foundLocation, itemName
GET /api/items/:id: Retrieve specific item details by ID

## 🤝 Contributing
We welcome contributions! Here's how you can help:

- Fork the project
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some AmazingFeature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

## 📜 License
- This project is licensed under the MIT License. See the LICENSE file for details.
## 📧 Contact

- Project Lead: Google Developer Student Club @ USF
- Email: gdsccs@gmail.com

