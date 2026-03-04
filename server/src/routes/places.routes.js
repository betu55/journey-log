const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Define routes for places
router.get("/", controller.getAllPlaces);
router.get("/search", controller.searchByPlaceName);
router.get("/placeName/:placeName", controller.getOneByPlaceName);

router.post("/", controller.createPlace);
router.delete("/:id", controller.deleteById);
router.patch("/:id", controller.updateById);

module.exports = router;