const Place = require("../../models/Place");

async function getAllPlaces() {
  return Place.find();
}

async function getOneByPlaceName(placeName) {
  return Place.findOne({placeName: { $regex: `^${placeName}$`, $options: "i" }});
}

async function searchByPlaceName(placeName){
  return Place.find({placeName: { $regex: placeName, $options: "i" }});
}

async function createPlace(placeData){
  const {placeName, location , dateVisited, description, rating, imageUrl} = placeData;
 
  if (!(placeName && location && dateVisited && description && rating)) {
    const err = new Error("Missing Required Fields");
    err.status = 400;
    throw err;
  }

  const lastPlace = await Place.findOne().sort({ id: -1 });
  const newId = lastPlace?.id? lastPlace.id + 1 : 1;

  const newPlace = new Place({
    id: newId,
    placeName,
    location,
    dateVisited: new Date(dateVisited),
    description,
    rating,
    imageUrl : imageUrl || "/images/default-Image.jpg",
  });

  return newPlace.save();
}

async function deleteByPlaceName(placeName){
  return Place.findOneAndDelete({placeName: { $regex: `^${placeName}$`, $options: "i" }});
}

async function updateByPlaceName(placeName, updateData){
  return Place.findOneAndUpdate(
    {placeName: { $regex: `^${placeName}$`, $options: "i" }},
    {$set: updateData},
    {returnDocument: "after", runValidators: true}
  );
}

async function deleteById(id){
  return Place.findByIdAndDelete(id);
}

async function updateById(id, updateData){
  return Place.findByIdAndUpdate(
    id,
    { $set: updateData },
    { returnDocument: "after", runValidators: true }
  );
}

async function getCoordinates(placeId){
  // Find place
  const place = await Place.findById(placeId);
  if(!place) throw new Error("Place Not Found");

  // If coords exist return them
  if(place.latitude != null && place.longitude != null){
    return {latitude: place.latitude, longitude: place.longitude};
  }

  // if not get them from api
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place.location)}`,
    { headers: { "User-Agent": "places-app" } } //header to prevent api access from being blocked
  );

  const data = await response.json();

  if(!data || data.length === 0){
    throw new Error("Unable to Find Coords")
  };
  
  const latitude = parseFloat(data[0].lat);
  const longitude = parseFloat(data[0].lon);

  //Save coords in mongodb for future use to avoid repeated api calls
  place.latitude = latitude;
  place.longitude = longitude;
  await place.save();

  return {latitude, longitude};

}

module.exports = {
  getAllPlaces,
  getOneByPlaceName,
  searchByPlaceName,
  createPlace,
  deleteByPlaceName,
  updateByPlaceName,
  deleteById,
  updateById,
  getCoordinates
};