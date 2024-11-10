// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import Express, a web framework for Node.js
const express = require("express");

// Import express-ejs-layouts for layout support in EJS templates
// Embedded JavaScript
const expressLayout = require("express-ejs-layouts");

// Import method-override to enable HTTP methods like PUT and DELETE in forms where the client or HTML form
// does not directly support them. For example, HTML forms only support GET and POST methods.
// With method-override, a POST request can be "overridden" as a PUT or DELETE request by specifying
// a query parameter (like "_method") or a custom HTTP header.
const methodOverride = require("method-override");

// Import cookie-parser to parse and manage cookies in incoming requests
const cookieParser = require("cookie-parser");

// Import express-session for managing user sessions
const session = require("express-session");

// Import connect-mongo to store session data in MongoDB
const MongoStore = require("connect-mongo");

// Import the MongoDB connection function from the config file
const connectDB = require("./server/config/db");

// Import isActiveRoute helper function to manage active route status, likely for UI purposes
const { isActiveRoute } = require("./server/helpers/routeHelpers");

// Initialize Express app
const app = express();

// Set the port to the value in .env or default to 5000
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse URL-encoded bodies, typically used when handling form submissions.
// `express.urlencoded({ extended: true })` parses incoming requests with URL-encoded payloads,
// such as form submissions with content type `application/x-www-form-urlencoded`.
//
// The `extended: true` option allows for rich objects and arrays to be encoded into the URL-encoded
// format, using the `qs` library under the hood. This means you can parse nested objects and arrays
// within the request body.
//
// Example:
// If `extended: true` is used, a form submission with fields like "user[name]=John&user[age]=30"
// will be parsed into a JavaScript object as { user: { name: 'John', age: 30 } }.
// If `extended: false` is used, nested objects and arrays will not be parsed, resulting in a simpler
// key-value format. For example, "user[name]=John&user[age]=30" would be parsed as { 'user[name]': 'John', 'user[age]': '30' }.
//
// Using `extended: true` is generally more powerful and flexible, allowing for complex data structures
// to be passed through form submissions or URL-encoded data.
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies from the request headers
app.use(cookieParser());

// Middleware to allow the usage of HTTP methods like PUT and DELETE by overriding with a query parameter
app.use(methodOverride("_method"));

// Session configuration
app.use(
  session({
    // Secret key to sign the session ID cookie, improving security
    secret: "keyboard cat",

    // Prevents the session from being saved back to the session store if it wasn’t modified
    resave: false,

    // Prevents a new session from being created for unmodified sessions
    saveUninitialized: true,

    // Store sessions in MongoDB, using the URI specified in the environment variables
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),

    // Optional cookie configuration to set session cookie expiration
    // cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
  })
);

// Serve static files (CSS, JavaScript, images) from the 'public' directory
app.use(express.static("public"));

// Set up EJS as the templating engine with layout support
app.use(expressLayout);

// Set the default layout file for views to './layouts/main.ejs'
app.set("layout", "./layouts/main");

// Set EJS as the view engine
app.set("view engine", "ejs");

// Make isActiveRoute available globally in views to help manage active route status
app.locals.isActiveRoute = isActiveRoute;

// Main route handler, loads routes defined in './server/routes/main'
app.use("/", require("./server/routes/main"));

// Admin route handler, loads routes defined in './server/routes/admin'
app.use("/", require("./server/routes/admin"));

// Start the Express server on the specified PORT, logging a message to the console on success
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
