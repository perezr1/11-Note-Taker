const router = require("express").Router();
const htmlRoutes = require("./htmlRoutes");
const apiRoutes = require("./apiRoutes");

// Sets up the Express app to handle data parsing
router.use("/api", apiRoutes);
router.use(htmlRoutes);

module.exports = router;
