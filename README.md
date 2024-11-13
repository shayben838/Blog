Blog Application
This is a simple blog application built with Node.js, Express, and MongoDB. The application allows users to create, edit, and delete blog posts. It uses MongoDB Atlas for database management and is deployed with Render.

Features
User authentication (registration and login)
Create, edit, and delete blog posts
Session management with cookies
Template rendering with EJS
Environment variable support using dotenv
Technologies Used
Node.js
Express: For building RESTful APIs
MongoDB & Mongoose: MongoDB Atlas as the database, with Mongoose for object data modeling
EJS: For dynamic HTML templating
bcrypt: For password hashing
JWT (jsonwebtoken): For generating and verifying user tokens
Session Management: Using express-session and connect-mongo
dotenv: For managing environment variables
Render: Used for deployment
Prerequisites
Node.js
MongoDB Atlas account and a connection URI
Installation
Clone the Repository:

git clone https://github.com/yourusername/blog.git
cd blog
Install Dependencies:

npm install
Environment Setup:

Create a .env file in the root directory of the project and add your MongoDB URI and other environment variables:

MONGODB_URI=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret

MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_session_secret

Start the Application:

For development, use nodemon to start the server:
npm run dev
For production, use:

npm start
Access the Application:

By default, the app will run on http://localhost:3000.

Deployment
This app is deployed using Render. Render provides a free tier and automatically assigns a URL to your deployed app. Ensure your MongoDB Atlas connection is configured to allow access from Render’s IP addresses.

Configuration Notes
MongoDB Connection: The app connects to MongoDB Atlas using a URI specified in the .env file. Render automatically assigns a PORT environment variable; ensure that your app uses process.env.PORT for deployment compatibility.
allow ip listing from the mongo atlas.

Session Management: Sessions are stored in MongoDB using connect-mongo, ensuring session persistence.

Package.json Overview
Here's an overview of the scripts in package.json:

"start": Starts the application in production mode by running node app.js.
"dev": Starts the application in development mode with nodemon for automatic restarts on file changes.

License
This project is licensed under the ISC License.

Admin Route
The blog application includes an Admin Route for managing posts and other administrative tasks. This route is restricted to authenticated users, allowing only authorized personnel to access and perform administrative actions.

Accessing the Admin Route
To access the admin section, users need to sign in with their credentials through the /admin route.
Once authenticated, users are redirected to the admin dashboard to manage blog content.

Note: For development and testing, you may choose to create a registration route temporarily (such as /register) to add users with admin permissions. However, it is recommended to disable or secure this route in production to prevent unauthorized access.

File Structure
The view template for the admin login is located at:
views/admin/index.ejs

This file contains the login form and is rendered when users navigate to the /admin route. Customize this template to suit your application's styling and security needs.
