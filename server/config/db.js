// Import mongoose, a MongoDB object modeling tool that provides a schema-based solution to model data
const mongoose = require("mongoose");

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Set mongoose option to disable strict query filtering.
    // By default, Mongoose enforces "strict query" mode, which means that it only allows fields
    // defined in the schema to be used in queries, helping catch potential typos and unintended fields.
    // Setting `strictQuery` to `false` allows more flexible query filtering, where you can use fields
    // that aren’t explicitly defined in the schema.
    //
    // This can be useful in certain scenarios, such as when:
    // - You want to query nested fields using dot notation (e.g., "user.profile.name") without explicitly
    //   defining all nested subfields in the schema.
    // - You’re working with data structures that may evolve over time, and strict query filtering
    //   would otherwise restrict access to fields that aren’t strictly defined.
    mongoose.set("strictQuery", false);

    // Connect to MongoDB using the URI provided in the environment variables
    // [//[user:password@]host[:port]][/]path[?query][#fragment]
    // Uniform Resource Identifier - URI
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    // Log a message to the console with the host name of the MongoDB server on successful connection
    console.log(`Database connected: ${connection.connection.host}`);
  } catch (error) {
    // If an error occurs, log the error to the console
    console.log(error);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
