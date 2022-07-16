import dotenv from "dotenv";
import AWS from "aws-sdk";
dotenv.config();

const bucket = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_IAM_USER_KEY;
const secretAccessKey = process.env.AWS_IAM_USER_SECRET;
const region = process.env.AWS_S3_REGION;

const s3: AWS.S3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});
const destination = `${process.env.AWS_BUCKET_NAME}/uploads/profile`;

export default { s3, destination };
