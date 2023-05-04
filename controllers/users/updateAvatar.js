const path = require("path");
const fs = require("fs/promises");

const { ctrlWrapper, HttpError } = require("../../helpers");
const { User } = require("../../models");
const { log } = require("console");

const avatarsDir = path.join(__dirname,  "..", "..", "public", "avatars");

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
  // path: tempUpload - шлях, originalname - імя під яким прийшов файл
  const filename = `${_id}_${originalname}`
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, {avatarURL});
  res.json({
    avatarURL,
  })
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };