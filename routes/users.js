const expres = require("express");

const router = expres.Router();

router.get("/", (req, res, next) => {
  res.json({ Hello: "World" });
});

module.exports = router;
