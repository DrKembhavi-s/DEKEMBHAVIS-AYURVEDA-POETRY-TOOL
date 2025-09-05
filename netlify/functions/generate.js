// Node 18+ (Netlify function)
// Save as: netlify/functions/generate.js
// Set OPENAI_API_KEY in Netlify site environment variables before deploying.


const fetch = require('node-fetch');


exports.handler = async function(event, context) {
try{
if(event.httpMethod !== 'POST') return { statusCode:405, body:'Method not allowed' };
const body = JSON.parse(event.body || '{}');
const { prompt, temperature = 0.75, max_tokens = 220 } = body;
if(!prompt) return { statusCode:400, body: 'Missing prompt' };


const apiKey = process.env.OPENAI_API_KEY;
if(!apiKey) return { statusCode:500, body: 'Server not configured: missing API key' };


// Construct a clear system + user prompt to keep tone consistent and discourage medical advice
const system = `You are a skilled poetic writer. Follow the user's instructions. Keep content creative, avoid giving medical advice or prescriptive health recommendations.`;


// Using OpenAI's Chat Completions (v1) — if using another provider, adapt accordingly.
const payload = {
model: 'gpt-4o-mini', // replace with the model your account supports; gpt-4o-mini is a placeholder
messages: [
{ role: 'system', content: system },
{ role: 'user', content: prompt }
],
temperature: Number(temperature),
max_tokens: Number(max_tokens)
};


const resp = awai
