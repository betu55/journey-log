const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const path = require("path");
const places = require("./data/places.json");
const fs = require("fs");
const dataFilePath = path.join(__dirname, "data", "places.json");

app.use(express.json());
app.use(cors());
// For CSS,Images
app.use(express.static(path.join(__dirname, "public")));

// GET all places
app.get("/api/places", (req, res) => {
  res.status(200).json({success: true, data: places}); // returns empty collection even if no places
});

// GET search a place
app.get('/api/places/search', (req, res) =>{
    const name = req.query.placeName;

    if(!name){
        return res.status(400).json({error: "Place Name is Required"});
    }
    const regex = new RegExp(name, "i");

    const filteredPlaces = places.filter(place => regex.test(place.placeName));

    if(filteredPlaces.length > 0){
        res.status(200).json({success: true, data: filteredPlaces});
    }
    else{
        res.status(404).json({error: "No Matching Places Found"});
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

    places.push(newPlace);
    fs.writeFileSync(dataFilePath, JSON.stringify(places, null, 2));
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
    fs.writeFileSync(dataFilePath, JSON.stringify(places, null, 2));
    res.status(200).json({ success: true, message: "Place Deleted Successfully" });
  } else {
    res.status(404).json({error: "Place Not Found"});
  }
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
