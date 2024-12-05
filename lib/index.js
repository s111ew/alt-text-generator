import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export const processImages = async (config) => {
  const openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] });
  const { INPUT, OUTPUT } = config;
  const PROMPT = `Analyze the provided image and generate a one-sentence description suitable as ALT text for an HTML element. Ensure the description is concise, describes the key content of the image, and avoids unnecessary details or subjective interpretations.`;

  const getImageFiles = async (directory) => {
    const files = await fs.readdir(directory);
    return files.filter((file) =>
      [".jpg", ".jpeg", ".png"].includes(path.extname(file).toLowerCase())
    );
  };

  const encodeImageToBase64 = async (filePath) => {
    const data = await fs.readFile(filePath);
    return data.toString("base64");
  };

  const generateAltText = async (base64Image) => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: PROMPT },
        { role: "user", content: `data:image/jpeg;base64,${base64Image}` },
      ],
    });
    return response.choices[0].message.content.trim();
  };

  const writeHtmlFile = async (filePath, elements) => {
    const htmlContent = elements
      .map(({ src, alt }) => `<img src="${src}" alt="${alt}">`)
      .join("\n");
    await fs.writeFile(filePath, htmlContent, { encoding: "utf8" });
  };

  const imageFiles = await getImageFiles(INPUT);
  if (!imageFiles.length) {
    console.log("No images found in the input directory.");
    return;
  }

  const elements = [];
  for (const file of imageFiles) {
    const filePath = path.join(INPUT, file);
    const base64Image = await encodeImageToBase64(filePath);
    const altText = await generateAltText(base64Image);
    elements.push({ src: filePath, alt: altText });
  }

  await writeHtmlFile(OUTPUT, elements);
};
