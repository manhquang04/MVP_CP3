require('dotenv').config();
const OpenAI = require('openai');

// DashScope-compatible OpenAI client
const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
});

module.exports = { openai };

