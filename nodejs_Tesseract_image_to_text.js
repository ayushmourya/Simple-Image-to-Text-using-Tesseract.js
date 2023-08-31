const express = require("express");
const fs = require("fs");
const path = require("path");
const Tesseract = require("tesseract.js");

const app = express();
const port = 3000;

app.get("/extract", async (req, res) => {
  try {
    const imagePath = "/your-image-path";

    const imageBuffer = fs.readFileSync(imagePath);

    const {
      data: { text },
    } = await Tesseract.recognize(imageBuffer, "eng", {
      logger: (info) => console.log(info),
    });

    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
