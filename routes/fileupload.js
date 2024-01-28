const express = require("express");

const router = express.Router();

const {imageUpload, videoUpload, reducedImageUpload,localFileUpload} = require("../controllers/FileUpload");

// api routes

router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/reducedImageUpload",reducedImageUpload);
router.post("/localFileUpload",localFileUpload);

module.exports = router;
