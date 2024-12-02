import { config } from "./alt-text-generator.config.js";
import "dotenv/config";

const API_KEY = config.API_KEY;

const inputPath = config.INPUT;

const outputPath = config.OUTPUT;

console.log(process.env);
