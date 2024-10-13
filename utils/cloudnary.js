const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "drjenzqla",
  api_key: "262535887459344",
  api_secret: "GCAMf46NVXJo4o04zJiKB3YJb64", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
