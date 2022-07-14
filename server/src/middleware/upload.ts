import multer from "multer";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

// local upload test
const localStorage = multer.diskStorage({
  destination: "../uploads/profile",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const localProfileUpload = multer({
  storage: localStorage,
});

// aws-s3 upload test
const bucket = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_IAM_USER_KEY || "aaa";
const secretAccessKey = process.env.AWS_IAM_USER_SECRET || "aa";
const region = process.env.AWS_S3_REGION || "aaa";
const s3: AWS.S3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

const S3ProfileUpload = multer({
  // storage: multerS3({
  //   s3,
  //   bucket: `${bucket}/uploads/profile`,
  //   // ACL: 'public-read',
  //   metadata: function (req, file, cb) {
  //     cb(null, { fieldName: file.fieldname });
  //   },
  //   contentType: multerS3.AUTO_CONTENT_TYPE,
  //   key: function (req, file, cb) {
  //     cb(null, `${Date.now()}_${file.originalname}`);
  //   },
  // }),
}); // S3로 이미지 업로드

export default { localProfileUpload, S3ProfileUpload };
