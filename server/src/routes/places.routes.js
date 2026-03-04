const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Define routes for places
router.get("/", controller.getAllPlaces);
router.get("/search", controller.searchByPlaceName);
router.get("/placeName/:placeName", controller.getOneByPlaceName);

router.post("/", controller.createPlace);
router.delete("/placeName/:placeName", controller.deleteByPlaceName);
router.patch("/placeName/:placeName", controller.updateByPlaceName);

module.exports = router;