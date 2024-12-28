# Alt-Text Generator

_Batch convert image files to html tags with src and alt attributes included._

## Overview

Alt-Text Generator is an npm package designed to automatically generate concise and descriptive ALT text for images in a specified folder, leveraging OpenAI's API. The generated ALT text is integrated into HTML `<img>` tags and saved in a Markdown file for easy usage.

---

## Key Features

- **Format Support**: Compatible with `.jpg`, `.jpeg`, and `.png` image formats.
- **AI-Powered ALT Text**: Automatically generates accurate and descriptive ALT text for each image.
- **HTML Output**: Outputs HTML `<img>` tags with the generated ALT text included.
- **User-Friendly**: Simple setup and configuration.

---

## Installation

Install the package via npm:

```bash
npm install alt-text-generator
```

---

## Setup

### Create a `.env` File

The `.env` file is used to securely store your OpenAI API key. If it does not exist, create it in the root directory of your project and ensure it is listed in your `.gitignore` file to avoid exposing sensitive information.

Add the following line to the `.env` file:

```env
OPENAI_API_KEY=<your-openai-api-key>
```

Replace `<your-openai-api-key>` with your actual OpenAI API key.

---

## Usage

### Importing the Module

#### ES Modules

```javascript
import { generateAltText } from "alt-text-generator";
```

#### CommonJS

```javascript
const { generateAltText } = require("alt-text-generator");
```

### Calling the Function

The `generateAltText` function requires two arguments:

- **inputPath**: Path to the folder containing the target image files.
- **outputPath**: Path to the Markdown file where the generated HTML tags will be written.

#### Example:

```javascript
import { generateAltText } from "alt-text-generator";

const inputPath = "./images"; // Path to the folder with image files
const outputPath = "./output.html"; // Path to the output file

generateAltText(inputPath, outputPath)
  .then(() => console.log("ALT text generation completed."))
  .catch((err) => console.error("Error generating ALT text:", err));
```

#### Expected Output

The `outputPath` file will contain HTML `<img>` tags with generated ALT text, such as:

```html
<img src="./images/image1.jpg" alt="A red apple on a white table." />
<img src="./images/image2.png" alt="A black cat sitting on a windowsill." />
```

---

## Configuration Details

### Input Folder

The `inputPath` should point to a folder containing `.jpg`, `.jpeg`, or `.png` images for ALT text generation.

### Output File

Specify the file path (`outputPath`) where the HTML tags should be written. If the file does not exist, it will be created automatically.

---

## API Reference

### `generateAltText(inputPath: string, outputPath: string): Promise`

| Parameter  | Type   | Description                                                            |
| ---------- | ------ | ---------------------------------------------------------------------- |
| inputPath  | string | Path to the folder containing the images.                              |
| outputPath | string | Path to the Markdown file where the generated HTML tags will be saved. |

This function scans the `inputPath` for supported image files, generates ALT text using OpenAI’s API, and writes the resulting HTML `<img>` tags to the `outputPath`.

---

## System Requirements

- **Node.js**: Version 14 or higher.
- **npm**: Version 6 or higher.
- **OpenAI API Key**: A valid API key from OpenAI.

---

## Example Project Structure

```
project-root/
│
├── .env              # Contains your OpenAI API key
├── images/           # Folder containing image files
│   ├── image1.jpg
│   ├── image2.png
│
├── output.html       # Output file for generated HTML tags (optional)
└── index.js          # Script importing and using the package
```

---

## Additional Notes

- Ensure the `.env` file is included in your `.gitignore` to keep your API key secure.
- For large image folders, the generation process might take time depending on the API response speed and the number of images.

---

## License

Alt-Text Generator is licensed under the [MIT License](https://opensource.org/licenses/MIT).
