const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Define routes for places
router.get("/", controller.requireAuth, controller.getAllPlaces);
router.get("/personal", controller.requireAuth, controller.getAllPlacesUser);
router.get("/search", controller.requireAuth, controller.searchByPlaceName);
router.get("/personal/search", controller.requireAuth, controller.searchByPlaceNameUser);
router.get("/placeName/:placeName", controller.requireAuth, controller.getOneByPlaceName);
router.get("/coords", controller.requireAuth, controller.getCoordinates);

router.post("/", controller.requireAuth, controller.createPlace);
router.post("/login", controller.login)
router.post("/register", controller.register)

router.delete("/:id", controller.requireAuth, controller.deleteById);
router.patch("/:id", controller.requireAuth, controller.updateById);

module.exports = router;