const mongoose = require("mongoose");

async function connectDB() {
  const DATABASE_HOST = 'localhost';
  const DATABASE_PORT = 27017;
  const dbURL = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/places_library`;
  await mongoose.connect(dbURL); 
}

module.exports = { connectDB };