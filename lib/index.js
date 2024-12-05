//ES6 MODULES

import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";

//GLOBALS
const openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
const INPUT_PATH = process.env["ALT_TEXT_INPUT"];
const OUTPUT_PATH = process.env["ALT_TEXT_OUTPUT"];
const PROMPT =
  "Analyze the provided image and generate a one-sentence description suitable as ALT text for an HTML element. Ensure the description is concise, describes the key content of the image, and avoids unnecessary details or subjective interpretations. Example: 'A red apple on a white table.'";

//GET IMAGE FILES FUNC
const getImageFiles = async (directory) => {
  try {
    const files = await fs.readdir(directory);
    return files.filter((file) =>
      [".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase())
    );
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
};

//ENCODE IMAGES TO BASE64 READY TO SEND TO MODEL FUNC
const encodeImageToBase64 = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);
    return data.toString("base64");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
};

//GET ALT TEXT FROM MODEL FUNC
const sendDataToModel = async (base64Image) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: PROMPT,
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error generating ALT text:", error);
    throw error;
  }
};

//FORMAT RESPONSES INTO HTML TAG AND WRITE INTO FILE FUNC
const writeHtmlFile = async (filePath, elements) => {
  try {
    const htmlContent = elements
      .map(({ src, alt }) => `<img src="${src}" alt="${alt}">`)
      .join("\n");
    await fs.writeFile(filePath, htmlContent, { encoding: "utf8" });
    console.log("HTML file written successfully.");
  } catch (error) {
    console.error("Error writing HTML file:", error);
    throw error;
  }
};

//MAIN FUNCION TO START PROCESS
export const generateAltText = async (inputPath, outputPath) => {
  try {
    const imageFiles = await getImageFiles(inputPath);
    if (imageFiles.length === 0) {
      console.log("No images found in the input directory.");
      return;
    }

    const elements = [];
    for (const file of imageFiles) {
      const filePath = path.join(inputPath, file);
      const base64Image = await encodeImageToBase64(filePath);
      const altText = await sendDataToModel(base64Image);
      elements.push({ src: filePath, alt: altText });
      console.log(`Processed: ${file} -> ALT text generated.`);
    }

    await writeHtmlFile(outputPath, elements);
  } catch (error) {
    console.error("Error processing images:", error);
  }
};

generateAltText(INPUT_PATH, OUTPUT_PATH);
