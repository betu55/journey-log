const Place = require("../../models/Place");
const testPlaces = require("../../data/places.json");

async function initDB() {
  try{
    const count = await Place.countDocuments();
    if (count === 0) {
      console.log("Adding Test Places...");
      await Place.insertMany(testPlaces);
      console.log("Test Places Added Successfully");
    }
    else {
      console.log("Places Already Exist");
    }
  }
  catch (error) {
    console.error("Error initializing database:", error);
  }
}

module.exports = { initDB };