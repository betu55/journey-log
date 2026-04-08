const Place = require("../../models/Place");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const COMMENT_MAX_LENGTH = 1000;

const PLACE_POPULATE = {
  path: "user",
  select: "username",
};

async function getAllPlaces() {
  return Place.find()
    .populate(PLACE_POPULATE)
    .sort({ dateVisited: -1 });
}

async function getOneByPlaceName(placeName) {
  return Place.findOne({
    placeName: { $regex: `^${placeName}$`, $options: "i" }
  }).populate(PLACE_POPULATE);
}

async function searchByPlaceName(placeName){
  return Place.find({
    placeName: { $regex: placeName, $options: "i" }
  })
    .populate(PLACE_POPULATE)
    .sort({ dateVisited: -1 });
}

async function createPlace(placeData){
  const {placeName, location , dateVisited, description, rating, imageUrl, userId} = placeData;
 
  if (!(placeName && location && dateVisited && description && rating)) {
    const err = new Error("Missing Required Fields");
    err.status = 400;
    throw err;
  }

  const newPlace = new Place({
    user : userId,
    placeName,
    location,
    dateVisited: new Date(dateVisited),
    description,
    rating,
    imageUrl : imageUrl || "/images/default-Image.jpg",
  });

  return newPlace.save();
}

async function deleteByPlaceName(placeName, userId){
  return Place.findOneAndDelete({
    user : userId,
    placeName: { $regex: `^${placeName}$`, $options: "i" }});
}

async function updateByPlaceName(placeName, updateData, userId){
  return Place.findOneAndUpdate({
    user : userId,
    placeName: { $regex: `^${placeName}$`, $options: "i" }},
    {$set: updateData},
    {returnDocument: "after", runValidators: true}
  );
}

async function deleteById(id, userId){
  return Place.findOneAndDelete({ _id: id, user: userId });
}

async function updateById(id, updateData, userId){
  const allowedUpdates = {
    placeName: updateData.placeName,
    location: updateData.location,
    dateVisited: updateData.dateVisited,
    description: updateData.description,
    rating: updateData.rating,
    imageUrl: updateData.imageUrl,
  };

  return Place.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: allowedUpdates },
    { new: true, runValidators: true }
  ).populate(PLACE_POPULATE);
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

async function login(userData){
  const user = await User.findOne({username: userData.username}).select("+password"); //"+" to include a hidden field
  console.log("Login attempt for username:", userData.username);

  if(!user) {
    throw new Error("Incorrect Username or Password");
  }

  const match = await user.comparePassword(userData.password);

  if(!match) {
    throw new Error("Incorrect Username or Password");
  }

  const response = user.toObject();
  delete response.password;

  const token = jwt.sign(
    {id: user._id, username: user.username}, 
    process.env.JWT_SECRET,
    {expiresIn: "1d"}
  );

  return {data: response, token};

}

async function register(userData){
  const existingUser = await User.findOne({username: userData.username});

  if(existingUser) {
    throw new Error("Username Already Exists");
  }

  const user = new User(userData)

  await user.save();

  const response = user.toObject();
  delete response.password;

  return response;

}


async function addComment(placeId, commentData) {
  const { username, text, time } = commentData;
  const normalizedText = text?.trim();

  if (!normalizedText || normalizedText.length > COMMENT_MAX_LENGTH) {
    throw new Error("Invalid Comment Length");
  }

  return Place.findOneAndUpdate(
    { _id: placeId },
    { 
      $push: { 
        comments: { 
          username, 
          text: normalizedText, 
          time: time ? new Date(time) : new Date()
        } 
      } 
    },
    { returnDocument: "after" }
  );
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
  getCoordinates,
  login,
  register,
 addComment 
};
