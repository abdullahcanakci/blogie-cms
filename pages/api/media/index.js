import withSession from "@utils/withSession";
import * as multer from "multer";
import * as AWS from "aws-sdk";
import * as multerS3 from "multer-s3";

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_PER,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PER,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET_NAME,
    acl: "public-read",
    key: function (request, file, cb) {
      cb(null, `${Date.now().toString()} - ${file.originalname}`);
    },
  }),
}).array("upload", 1);

export default withSession(async (req, res) => {
  const user = req.session.get("user");

  if (!user) {
    return res.json({ url: null });
  }
  console.log("test");

  upload(req, res, function (error) {
    console.log("test1");
    if (error) {
      console.log("test2");
      console.log(error);
      return res.status(404);
    }
    console.log("tes3");
    res.status(201).json({ url: req.files[0].location });
  });
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
