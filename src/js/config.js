// Polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// Environment
import * as dotenv from 'dotenv';
dotenv.config();
const { API_KEY } = process.env;
export const apiKey = API_KEY;
