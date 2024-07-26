// GEMINI
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.0-pro',
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: 'text/plain',
};

async function geminiRun(req, res) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const result = await chatSession.sendMessage(`give me only plain text not other markdowns and you need to give me professional summary for resume according to user role -> role '${req.body.role}'`);

  res.status(200).json({ output: result.response.text() });
}

module.exports = { geminiRun };
