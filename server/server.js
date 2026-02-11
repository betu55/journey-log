const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const path = require("path");
const places = require("./data/places.json");

app.use(express.json());
app.use(cors());
// For CSS,Images
app.use(express.static(path.join(__dirname, "public")));

// GET all places
app.get("/api/places", (req, res) => {

  if (places.length > 0) {
    res.status(200).json({success: true, data: places});
  } else{
    res.status(404).json({ error: "No places found" });
  }

});

// POST/Create a new place
app.post("/api/places", express.json(), (req, res) => {
  const newPlace = req.body;

  if(newPlace && newPlace.placeName && newPlace.location && newPlace.dateVisited && newPlace.description && newPlace.rating){
    
    if(!newPlace.imageUrl){
      newPlace.imageUrl = "/images/default-Image.jpg";
    }

    // Calculate ID number for each new entry
    let newId = 1;
    if (places.length > 0) {
      const lastEntry = places[places.length - 1];
      newId = parseInt(lastEntry.id) + 1;
    }

    newPlace.id = newId.toString(); 

    places.push(newPlace)
    res.status(201).json({success: true, data: newPlace});
  } else {
    res.status(400).json({ error: "All Fields Except Image URL are required"});
  }

});

// DELETE a place by place name
app.delete("/api/places/placeName/:placeName", (req, res) =>{
  const name = req.params.placeName;
  const placeIndex = places.findIndex(p => p.placeName.toLowerCase() === name.toLowerCase());
  if (placeIndex !== -1){
    places.splice(placeIndex, 1);
    res.status(200).json({ success: true, message: "Place Deleted Successfully" });
  } else {
    res.status(404).json({error: "Place Not Found"});
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
