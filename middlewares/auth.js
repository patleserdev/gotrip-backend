const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Non autorisé, token manquant")
    return res.status(401).json({ message: "Non autorisé, token manquant" });
    
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) 
      {
        console.log("Token invalide ou expiré")
        return res.status(401).json({ message: "Token invalide ou expiré" });
      }

    const now = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - now;

    // Si le token expire dans moins de 10 minutes
    if (timeLeft < 600) {
      const refreshedToken = jwt.sign(
        { username: decoded.username }, // Ajoute d'autres infos si besoin
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.setHeader("x-refreshed-token", refreshedToken); // Renvoi du nouveau token côté client
    }

    req.user = decoded;
    next();
  });
}


module.exports = auth;
