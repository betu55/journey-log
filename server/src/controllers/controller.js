const service = require("../services/service");
const jwt = require('jsonwebtoken');

// Controller functions for handling API requests related to places

// Get all places
async function getAllPlaces(req, res){
  try{ 
    const places = await service.getAllPlaces(req.user.id);
    return res.status(200).json({
      success: true,
      data: places
    });
  } catch{
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// Get one place by name
async function getOneByPlaceName(req, res){
  try{
    const name = req.params.placeName;
    const place = await service.getOneByPlaceName(name, req.user.id);

    if(!place){
      return res.status(404).json({
        success: false,
        error: "Place Not Found"
      });
    }

    return res.status(200).json({
      success: true,
      data: place
    });

  } catch{
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// Search places by name
async function searchByPlaceName(req, res){
  try{
    const name = req.query.placeName;
    
    if(!name){
      return res.status(400).json({
        success: false,
        error: "Place Name is Required"
      });
    }

    const places = await service.searchByPlaceName(name, req.user.id);

    return res.status(200).json({
      success: true,
      data: places
    });
  }catch{
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// Create a new place
async function createPlace(req, res){
  try{
    const placeData = {...req.body, userId: req.user.id};
    const newPlace = await service.createPlace(placeData);

    return res.status(201).json({
      success: true,
      data: newPlace
    });
  }catch(err){
    if (err.status === 400) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    if(err.name === "ValidationError"){
      return res.status(400).json({
        success: false,
        message: "Improper Data Format",
        error: err.message
      });
    }
    if(err.code === 11000){
      return res.status(409).json({
        success: false,
        message: "Duplicate Place",
        error: err.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// delete place by name
async function deleteByPlaceName(req, res){
  try{
    const deletedPlace = await service.deleteByPlaceName(req.params.placeName, req.user.id);
    if(!deletedPlace){
      return res.status(404).json({
        success: false,
        error: "Place Not Found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Place Deleted Successfully"
    });
  }catch{
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// update place by name
async function updateByPlaceName(req, res){
  try{
    const placeName = req.params.placeName;
    const updateData = req.body;
    const updatedPlace = await service.updateByPlaceName(placeName, updateData, req.user.id);
    if (!updatedPlace){
      return res.status(404).json({
        success: false,
        error: "Place Not Found"
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedPlace
    });
  }catch(err){
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Improper Data Format",
        error: err.message
      });
    }
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate Place",
        error: err.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
}
async function deleteById(req, res){
  try{
    const deletedPlace = await service.deleteById(req.params.id, req.user.id);
    if(!deletedPlace){
      return res.status(404).json({
        success: false,
        error: "Place Not Found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Place Deleted Successfully"
    });
  }catch{
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

async function updateById(req, res){
  try{
    const updatedPlace = await service.updateById(req.params.id, req.body, req.user.id);
    if(!updatedPlace){
      return res.status(404).json({
        success: false,
        error: "Place Not Found"
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedPlace
    });
  }catch(err){
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Improper Data Format",
        error: err.message
      });
    }
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate Place",
        error: err.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

//API call to get location coords
async function getCoordinates(req, res){
  try{
    const placeId = req.query.id;
    
    if (!placeId){
      return res.status(400).json({
        sucess: false,
        error: "Place ID is Required"
      });
    }

    const coords = await service.getCoordinates(placeId, req.user.id);

    return res.status(200).json({
      success: true,
      data: coords
    });

  } catch{
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// Login 
async function login(req, res){
  try{
    if(!req.body.username || !req.body.password){
      return res.status(400).json({ 
        success: false, 
        message: "Username and Password are Required" 
      });
    }

    const user = await service.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: user
    });
  } catch(error){
    if (error.message === "Username Does Not Exist" || error.message === "Incorrect Password") {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

//Register
async function register(req, res){
  try{
    const newUser = await service.register(req.body);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: newUser
    });
  }catch(error){
    if(error.message === "Username Already Exists"){
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

// Middleware function to protect routes
async function requireAuth(req, res, next){
  let token;
  const authHeader = req.headers.authorization;

  if(authHeader && authHeader.startsWith('Bearer')){
    try{
      token = authHeader.split(" ")[1];
      const verify = jwt.verify(token, process.env.JWT_SECRET);

      req.user = verify;
      return next();

    }catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Failed"
      })
    }
  }

  if(!token){
    return res.status(401).json({
      sucess: false,
      message: "No Token"
    })
  }
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
  requireAuth
}