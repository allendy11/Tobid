import multer from "multer";
import multerS3 from "multer-s3";
import dotenv from "dotenv";
import AWSConfig from "../config/AWSConfig";
dotenv.config();

// local upload
const localStorage = multer.diskStorage({
  destination: "../uploads/profile",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const localProfileUpload = multer({
  storage: localStorage,
});

// aws-s3 upload

const S3ProfileUpload = multer({
  storage: multerS3({
    s3: AWSConfig.s3,
    bucket: AWSConfig.destination,
    // acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
}); // S3로 이미지 업로드

export default { localProfileUpload, S3ProfileUpload };
