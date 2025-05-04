var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/users.js");
const { checkBody } = require("../modules/checkBody.js");

/** Se connecter */

router.post("/login", async (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
      password: password,
    });

    if (!user) {
      return res.json({
        result: false,
        error: "Erreur lors de la connexion, vérifiez vos identifiants.",
      });
    }
    const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ result: true, message: "utilisateur connecté", jwtToken });
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
