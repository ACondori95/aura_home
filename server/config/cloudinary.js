const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload image to Cloudinary
 * @param {String} file - Base64 encoded file or file path
 * @param {String} folder - Cloudinary folder name
 * @returns {Promise} - Upload result with URL
 */
const uploadImage = async (file, folder = "aura-home/products") => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: "auto",
      transformation: [
        {width: 1000, height: 1000, crop: "limit"},
        {quality: "auto:good"},
        {fetch_format: "auto"},
      ],
    });

    return {url: result.secure_url, publicId: result.public_id};
  } catch (error) {
    throw new Error(`Error uploading image: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary
 * @param {String} publicId - Cloudinary public ID
 * @returns {Promise} - Delete result
 */
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
};

/**
 * Delete multiple images from Cloudinary
 * @param {Array} publicIds - Array of Cloudinary public IDs
 * @returns {Promise} - Delete result
 */
const deleteImages = async (publicIds) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    throw new Error(`Error deleting images: ${error.message}`);
  }
};

/**
 * Extract public ID from Cloudinary URL
 * @param {String} url - Cloudinary URL
 * @returns {String} - Public ID
 */
const extractPublicId = (url) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const publicId = filename.split(".")[0];
  const folder = parts.slice(parts.indexOf("aura-home"), -1).join("/");
  return `${folder}/${publicId}`;
};

module.exports = {
  cloudinary,
  uploadImage,
  deleteImage,
  deleteImages,
  extractPublicId,
};
