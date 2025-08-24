var express = require("express");
var router = express.Router();
const Categorie = require("../models/categories.js");
const { checkBody } = require("../modules/checkBody.js");

/**
 * Return markers
 */
router.get("/", async function (req, res, next) {
  const categories = await Categorie.find();
  res.json({ result: true, datas: categories });
});

/**
 * Return marker ID
 */
router.get("/:id", async function (req, res, next) {
  if (req.params.id) {
    const categorie = await Categorie.findOne({ _id: req.params.id });
    res.json({ result: true, datas: categorie });
  }
});

/**
 * Add marker
 */
router.post("/", async function (req, res, next) {
  if (!checkBody(req.body, ["title"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const newCategorie = new Categorie({
    title: req.body.title,
   
  });

  const response = await newCategorie.save();
  res.json({ result: true, datas: response });
});

/**
 * Update marker
 */
router.put("/:id", async function (req, res, next) {
  const updateCategorie = {
    title: req.body.title,
  };

  const response = await Categorie.updateOne({ _id: req.params.id }, updateCategorie);
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
  const response = await Categorie.deleteOne({ _id: req.params.id });
  if (response.ok) {
    res.json({ result: true, message: "Marker supprimé" });
  } else {
    res.json({ result: false, message: "Marker non supprimé" });
  }
});

module.exports = router;
