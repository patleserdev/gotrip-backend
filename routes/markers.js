var express = require("express");
var router = express.Router();
const Marker = require("../models/markers.js");
const { checkBody } = require("../modules/checkBody.js");

/**
 * Return markers
 */
router.get("/", async function (req, res, next) {
  const markers = await Marker.find();
  res.json({ result: true, datas: markers });
});

/**
 * Return marker ID
 */
router.get("/:id", async function (req, res, next) {
  if (req.params.id) {
    const marker = await Marker.findOne({ _id: req.params.id });
    res.json({ result: true, datas: marker });
  }
});

/**
 * Add marker
 */
router.post("/", async function (req, res, next) {
  if (!checkBody(req.body, ["title", "categorie", "latitude", "longitude"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const newMarker = new Marker({
    title: req.body.title,
    categorie: {
      title: req.body.categorie.title,
    },
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    isFavorite: false,
  });

  const response = await newMarker.save();
  res.json({ result: true, datas: response });
});

/**
 * Update marker
 */
router.put("/:id", async function (req, res, next) {
  const updateMarker = {
    title: req.body.title,
    categorie: {
      title: req.body.categorie.title,
    },
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    isFavorite: req.body.isFavorite,
  };

  const response = await Marker.updateOne({ _id: req.params.id }, updateMarker);
  if (response.modifiedCount == 1) {
    res.json({ result: true, message: `${req.params.id}` });
  } else {
    res.json({ result: false, message: "Aucune modification" });
  }
});

/**
 * Remove marker
 */
router.delete("/:id", async function (req, res, next) {
  const response = await Marker.deleteOne({ _id: req.params.id });
  if (response.ok) {
    res.json({ result: true, message: "Marker supprimé" });
  } else {
    res.json({ result: false, message: "Marker non supprimé" });
  }
});

module.exports = router;
