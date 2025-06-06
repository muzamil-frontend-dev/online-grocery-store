import multer from "multer";
import path from "path";
import asyncHandler from "express-async-handler";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileEx = path.extname(file.originalname);
    console.log(fileEx);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileEx);
  },
});

const fileFilter = function (file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  let types = /.jpg|.png|.jpeg/;

  let fileType = path.extname(file.originalname).toLocaleLowerCase();

  let mimeType = file.mimetype.toLocaleLowerCase();

  console.log(fileType, mimeType);

  const fileTypeValid = types.test(fileType);
  const mimeTypeValid = types.test(mimeType);

  if (fileTypeValid && mimeTypeValid) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb(null, false);
  }
};

export const multerConfig = multer({
  storage: diskStorage,
  fileFilter: function (req, file, cb) {
    return fileFilter(file, cb);
  },
});

// Path         /api/admin/uploads
// Type         Put
// Access       Privage
// Desc         Upload Product image
export const uploadImage = asyncHandler(async (req, res) => {
  const image = req.file;
  return res.json({ imageUrl: image.path });
});
