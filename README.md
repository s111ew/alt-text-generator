# alt-text-generator

</br>

## About

Alt Text Generator is an npm package that automatically generates concise and descriptive ALT text for images in a given folder, leveraging OpenAI's API. The generated ALT text is written to a Markdown file in the form of HTML `<img>` tags.

### Basic Overview:

1. Install the package:

```
npm i alt-text-generator
```

2. Call the function:

```
generateAltText(inputPath, outputPath)
```

3. Use the generated HTML tags with generated ALT Text automatically included:

```
<img src="./images/image1.jpg" alt="A red apple on a white table.">
<img src="./images/image2.png" alt="A black cat sitting on a windowsill.">
```

</br>

## Features

• Supports `.jpg`, `.jpeg`, and `.png` image formats.

• Automatically generates ALT text for each image using AI.

• Outputs HTML `<img>` tags to a specified Markdown file.

• Easy to configure and use.

</br>

## Installation

Install the package via npm:

```
npm i alt-text-generator
```

</br>

## Setup

1. Create a `.env` File
   The `.env` file is used to securely store your OpenAI API key. If the `.env` file doesn't exist, create one in the root directory of your project and make sure to add it to your `.gitignore` file if applicable.

2. Add your OpenAI API key to the `.env` file as follows:

```
OPENAI_API_KEY=<your-openai-api-key-here>
```

Replace `<your-openai-api-key-here>` with your actual OpenAI API key.

</br>

## Usage

### 1. Import the Module</br>

You can import the generateAltText function using ES modules or CommonJS:

ES Modules:

```
import { generateAltText } from "alt-text-generator";
```

CommonJS:

```
const { generateAltText } = require("alt-text-generator");
```

### 2. Call the Function</br>

The `generateAltText` function takes two arguments:

• Path to the folder containing the target image files.
• Path to the output Markdown file where the generated HTML tags will be written.

Example:

```
import { generateAltText } from "alt-text-generator";

const inputPath = "./images"; // Path to the folder with image files
const outputPath = "./output.html"; // Path to the output file (created if it doesn't exist)

generateAltText(inputPath, outputPath)
```

Expected Output:
The output file will contain HTML `<img>` tags like this:

```
<img src="./images/image1.jpg" alt="A red apple on a white table.">
<img src="./images/image2.png" alt="A black cat sitting on a windowsill.">
```

</br>

## Configuration

### Input Folder:

The input folder should contain the image files (.jpg, .jpeg, .png) for which you want ALT text generated.

### Output File:

Specify the file path where the HTML tags should be written. If the file does not exist, it will be created.

</br>

## API Reference

```
generateAltText(inputPath: string, outputPath: string): Promise
```

| Parameter | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| inputPath | string | Path to the folder containing the images.                      |
| git diff  | string | Path to the Markdown file where the HTML tags will be written. |

This function scans the input folder for valid images, generates ALT text using OpenAI's API, and writes HTML tags to the output file.

</br>

## Requirements

• Node.js: v14 or higher

• npm: v6 or higher

• OpenAI API Key

</br>

## Example File Structure

</br>

```
project-root/
│
├── .env # Contains your OpenAI API key
├── images/ # Folder containing image files
│ ├── image1.jpg
│ ├── image2.png
│
├── output.html # (Optional) Output file for generated HTML tags
└── index.js # Script importing and using the package
```
