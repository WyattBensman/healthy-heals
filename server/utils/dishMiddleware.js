const upload = require("./uploadMiddleware");

function handleDishImage(req, res, next) {
  if (req.file) {
    req.body.image = req.file.path;
  }
  next();
}

module.exports = { handleDishImage };
