const Place = require("../../models/Place");
const User = require("../../models/User");
const testPlaces = require("../../data/places.json");

async function initDB() {
  try{
    // Clean up data from previous initializations when login features was not implemented 
    const deletedPlacesWithNoUser = await Place.deleteMany({ user: { $exists: false } });
    if (deletedPlacesWithNoUser.deletedCount > 0) {
      console.log(`Cleaned up ${deletedPlacesWithNoUser.deletedCount} places.`);
    }

    let testUser = await User.findOne({username: "test"});

    if (!testUser){
      console.log("Creating Test User...");

      testUser = new User({
        username: "test",
        password: "password"
      });

      await testUser.save();
      console.log("Test User Created: Username: test, Password: password");
    }

    const count = await Place.countDocuments({user: testUser._id });
    if (count === 0) {
      console.log("Adding Test Places for Test User...");

      const placesForTestUser = testPlaces.map((place, index) => ({
        ...place,
        user : testUser._id,
        id: index + 1
      }));

      await Place.insertMany(placesForTestUser);
      console.log("Test Places Added Successfully for Test User");
    }
    else {
      console.log("Places Already Exist for Test User");
    }
  }
  catch (error) {
    console.error("Error initializing database:", error);
  }
}

module.exports = { initDB };