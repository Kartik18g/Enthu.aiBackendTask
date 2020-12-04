const Fs = require("fs");
const Path = require("path");
const axios = require("axios");
const sharp = require("sharp");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const config = require("config");

exports.generateThumbnail = async (req, res) => {
  // useing express validator to send message if url is empty
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const fileName = crypto.randomBytes(5).toString("hex");
  // getting image from body
  const { imageUrl } = req.body;
  const url = imageUrl;
  // setting the input path
  const path = Path.resolve(__dirname, "images", `${fileName}.jpg`);

  // axios image download with response type "stream"
  var config = {
    responseType: "stream",
  };
  const response = await axios.get(url, config);

  // pipe the result

  response.data.pipe(Fs.createWriteStream(path));

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on("end", async () => {
      resolve();
      // sharp to resize the image and then retur a buffer , convert buffer to base64 and return it
      sharp(path)
        .resize(500, 500, {})
        .toFormat("jpeg")
        .toBuffer()
        .then((outputBuffer) => {
          const imageAsBase64 = outputBuffer.toString("base64");
          // also delete the image form server using synchronous unlink
          Fs.unlinkSync(path);
          // send response
          res.json({
            inputImageURL: url,
            OutputImageBase64: `data:image/png;base64,${imageAsBase64}`,
            message: "Thumbnail generated successfully!! YAY",
          });
        })
        .catch((err) => {
          res.json({
            inputImageURL: url,
            OutputImageBase64: "null",
            message:
              "An internal error occured..Did you provide the correct Link",
          });
        });
    });
    response.data.on("error", () => {
      res.send("incomplete");
      reject();
    });
  });
};
