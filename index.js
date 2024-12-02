import { config } from "./alt-text-generator.config.js";
import "dotenv/config";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();

const API_KEY = process.env.API_KEY;

const inputPath = config.INPUT;
const outputPath = config.OUTPUT;

const prompt = `Analyze the provided image and generate a one-sentence description suitable as ALT text for an HTML element. Ensure the description is concise, describes the key content of the image, and avoids unnecessary details or subjective interpretations. Example: 'A red apple on a white table.'`;

// Encode all images to base64
const encodeImagesToBase64 = (inputPath) => {
  fs.readdir(inputPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return;
    }

    const imageFiles = files.filter((file) =>
      [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(
        path.extname(file).toLowerCase()
      )
    );

    const encodedImages = [];

    imageFiles.forEach((file) => {
      const filePath = path.join(inputPath, file);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        const base64Image = data.toString("base64");
        encodedImages.push({ fileName: file, base64: base64Image });

        if (encodedImages.length === imageFiles.length) {
          const encodedImage = encodedImages[0];
          sendImagesToModel(encodedImage.base64);
        }
      });
    });
  });
};

//SEND IMAGES TO VISION MODEL IN BASE64 FORMAT
async function sendImagesToModel(base64Image) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
encodeImagesToBase64(inputPath);
