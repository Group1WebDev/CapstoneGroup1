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
  console.log(req.body.prompt);
  if (req.body.type == 'professional_summary') {
    const result = await chatSession.sendMessage(`Write a professional summary for resume according to this prompt: ${req.body.prompt}, give me this in p tag in plain HTML code`);

    return res.status(200).json({ output: result.response.text() });
  }
  if (req.body.type == 'key_skills') {
    const result = await chatSession.sendMessage(`Write a key_skills for resume according to this prompt: ${req.body.prompt}, give me this in ul and li as bullet points in the plain HTML code`);

    return res.status(200).json({ output: result.response.text() });
  }
  if (req.body.type == 'work_summary') {
    const result = await chatSession.sendMessage(`Write a professional work summary for resume according to this title: ${req.body.title} and use this prompt: ${req.body.prompt}, give me this in ul and li as bullet points in the plain HTML code`);

    return res.status(200).json({ output: result.response.text() });
  }

  return res.status(200).json({ output: 'NOT FOUND ANY PROMPT BY USER' });
}

module.exports = { geminiRun };
