var express = require("express");
var router = express.Router();
const MarkerPicture = require("../models/markerpictures.js");
const { checkBody } = require("../modules/checkBody.js");

/**
 * Return markers
 */
router.get("/", async function (req, res, next) {
  const pictures = await MarkerPicture.find();
  res.json({ result: true, datas: pictures });
});

/**
 * Return marker ID
 */
router.get("/:id", async function (req, res, next) {
  if (req.params.id) {
    const picture = await MarkerPicture.findOne({ _id: req.params.id });
    res.json({ result: true, datas: picture });
  }
});

/**
 * Add marker
 */
// ajout du fichier
router.post("/", async function (req, res, next) {
  if (!checkBody(req.body, ["title"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ message: "No files were uploaded." });
  }

  let uploadedFile = req.files.file;
  // Uploader directement depuis le buffer du fichier
  cloudinary.uploader
    .upload_stream(
      {
        folder: "gotrip",
        resource_type: "auto",
        transformation: [{ aspect_ratio: "1.0", height: 800, crop: "fit" }],
      },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send({ error: "Failed to upload to Cloudinary", details: error });
        }
        // console.log('resultCloudinary',result)

      
      
        (async ()=>{

          const newMarkerPicture = new MarkerPicture({
            title: req.body.title,
           
          });
          const response = await newMarkerPicture.save();
          res.json({ result: true, datas: response });

        })()
        


        res.json({
          result: true,
          url: result.secure_url,
          publicid: result.public_id,
        });
        // res.json({ message: 'File uploaded successfully', url: result.secure_url });
      }
    )
    .end(uploadedFile.data); // Envoyer le buffer directement à Cloudinary

 
});


router.post("/addfile", authenticateToken, (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ message: "No files were uploaded." });
  }

  let uploadedFile = req.files.file;
  // Uploader directement depuis le buffer du fichier
  cloudinary.uploader
    .upload_stream(
      {
        folder: "gotrip",
        resource_type: "auto",
        transformation: [{ aspect_ratio: "1.0", height: 800, crop: "fit" }],
      },
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .send({ error: "Failed to upload to Cloudinary", details: error });
        }
        // console.log('resultCloudinary',result)
        res.json({
          result: true,
          url: result.secure_url,
          publicid: result.public_id,
        });
        // res.json({ message: 'File uploaded successfully', url: result.secure_url });
      }
    )
    .end(uploadedFile.data); // Envoyer le buffer directement à Cloudinary

  // const uniqid = uid2(16);
  // const photoPath = `./tmp/${uniqid}.jpg`;
  // const resultMove = await req.files.file.mv(photoPath);
  // console.log(resultMove)
  // if (!resultMove)
  // {

  // const resultCloudinary = await cloudinary.uploader.upload(photoPath, {
  //   folder: "alice",
  //   resource_type: "auto",
  //   transformation: [
  //     {aspect_ratio: "1.0", height: 800, crop: "fit"},
  //     ]
  // });
  // fs.unlinkSync(photoPath);

  // res.json({ result: true, url: resultCloudinary.secure_url, publicid: resultCloudinary.public_id });
  // }
  // else
  // {
  //   res.json({ result: false, error: resultMove });
  // }
});

/**
 * Update marker
 */
router.put("/:id", async function (req, res, next) {
  const updateMarkerPicture = {
    title: req.body.title,
  };

  const response = await MarkerPicture.updateOne({ _id: req.params.id }, updateMarkerPicture);
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
  const response = await MarkerPicture.deleteOne({ _id: req.params.id });
  if (response.ok) {
    res.json({ result: true, message: "Marker Picture supprimé" });
  } else {
    res.json({ result: false, message: "Marker Picture non supprimé" });
  }
});

module.exports = router;
