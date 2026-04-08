require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");

const { connectDB } = require("./src/init/connectDB");
const { initDB } = require("./src/init/initDB");
const { initSocket } = require("./src/init/socket");
const placesRouter = require("./src/routes/places.routes");

const app = express();
const server = http.createServer(app);
const PORT = 8080;

initSocket(server);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/places", placesRouter);

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint Not Found",
  });
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    return initDB();
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server & Socket.io running on port: " + PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// // MongoDB setup
// const DATABASE_HOST = 'localhost';
// const DATABASE_PORT = 27017;
// const dbURL = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/places_library`;
// mongoose.connect(dbURL);
// const db = mongoose.connection;

// db.on('error', function(e) {
//     console.log('Error Connecting:' + e);
// });
// db.on('open', function() {
//     console.log('Database Connected');
// });

// // Add sample data to database
// async function addTestPlacesToMongoDB() {
//   try {
//     const placeCount = await Place.countDocuments();

//     if (placeCount >= 0) {
//       console.log("Adding Test Places...");
//       await Place.insertMany(testPlaces);
//       console.log("Test Places Added Successfully");
//     }
//     else {
//       console.log("Places Already Exist");
//     }

//   } catch (error) {
//     console.error("Error Adding Places", error);
//   }
// }
// addTestPlacesToMongoDB();

// // GET all places
// app.get("/api/places", async (req, res) => {
//    try {
//     const places = await Place.find();

//     return res.status(200).json({
//       success: true,
//       data: places // returns empty collection even if no places
//     });

//   } catch (error) {

//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }
// });

// //GET one place
// app.get("/api/places/placeName/:placeName", async (req, res) =>{
//   try{
//     const name = req.params.placeName;

//     const place = await Place.findOne({
//       placeName: { $regex: `^${name}$`, $options: "i" }
//     });

//     if (place){
//       res.status(200).json({
//         success: true,
//         data: place
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         error: "Place Not Found"
//       });
//     }

//   } catch (error){

//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });

//   }
// });

// // GET search a place
// app.get('/api/places/search', async (req, res) =>{
//   try{
//     const name = req.query.placeName;

//     if(!name){
//         return res.status(400).json({error: "Place Name is Required"});
//     }

//     const places = await Place.find({
//       placeName: { $regex: name, $options: "i"}
//     });

//     return res.status(200).json({
//       success: true,
//       data: places // returns empty collection even if no places found
//     });

//   } catch (error) {

//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }
// });

// // POST/Create a new place
// app.post("/api/places", express.json(), async (req, res) => {
//   try{
//     const {placeName, location, dateVisited, description, rating, imageUrl} = req.body;

//     if(placeName && location && dateVisited && description && rating){

//       // Find the current max ID and calculate next ID
//       const lastPlace = await Place.findOne().sort({ id: -1 }); // last added entry
//       let newId = 1;
//       if (lastPlace && lastPlace.id) {
//         newId = lastPlace.id + 1;
//       }

//       const finalImageUrl = imageUrl || "/images/default-Image.jpg"

//       const newPlace = new Place({
//         id: newId,
//         placeName,
//         location,
//         dateVisited: new Date(dateVisited),
//         description,
//         rating,
//         imageUrl: finalImageUrl
//       });

//       const savedPlace = await newPlace.save();

//       res.status(201).json({
//         success: true,
//         data: savedPlace
//       });

//     } else {
//       res.status(400).json({ error: "All Fields Except Image URL are required"});
//     }

//   } catch (error){

//     // Validation errors in schema
//     if (error.name === "ValidationError") {
//       return res.status(400).json({
//         success: false,
//         message: "Improper Data Format",
//         error: error.message
//       });
//     }

//     // Duplicate key error for unique fields in schema
//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Duplicate Place",
//         error: error.message
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }

// });

// // DELETE a place by place name
// app.delete("/api/places/placeName/:placeName", async (req, res) =>{
//   try{
//     const name = req.params.placeName;

//     const deletedPlace = await Place.findOneAndDelete({
//       placeName: { $regex: `^${name}$`, $options: "i" }
//     });

//     if (deletedPlace){
//       res.status(200).json({
//         success: true,
//         message: "Place Deleted Successfully"
//       });
//     } else {
//       res.status(404).json({
//         success: false,
//         error: "Place Not Found"
//       });
//     }

//   } catch (error){

//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });

//   }
// });

// // UPDATE a place by place name
// app.patch("/api/places/placeName/:placeName", express.json(), async (req, res) => {
//   try{
//     const name = req.params.placeName;
//     const updates = req.body; // Can include any fields: placeName, location, dateVisited, description, rating, imageUrl

//     const updatePlace = await Place.findOneAndUpdate(
//       {placeName : {$regex: `^{name}$`, $options: "i"}},
//       {$set: updates},
//       {new: true, runValidators: true}
//     );

//     if(!updatePlace){
//       return res.status(404).json({
//         success: false,
//         message: "Place Not Found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: updatedPlace
//     });
//   } catch (error){

//      // Validation errors in schema
//     if (error.name === "ValidationError") {
//       return res.status(400).json({
//         success: false,
//         message: "Improper Data Format",
//         error: error.message
//       });
//     }

//     // Duplicate key error for unique fields in schema
//      if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: "Duplicate Place",
//         error: error.message
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });

//   }
// })

// // Start server
// app.listen(PORT, () => {
//   console.log("Server running on port: " + PORT);
// });
