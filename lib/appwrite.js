import { Client, Account, Avatars, Databases } from "react-native-appwrite"

export const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67c5d24d000f9172f860')
  .setPlatform('dev.netninja.sheflie')

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
//MONGO_URI=mongodb+srv://bonheu404:Arabizi4@drone-project.qxbwvbw.mongodb.net/shelfie
//GEMINI_API_KEY=AIzaSyDbYhKc8_cxnfr_tefBDaT5_24c_IrswyU
/*
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = 5000;

// ... everything from the previous working index.js stays the same ...
// Just add this ONE line after your middleware:
app.use(express.static(path.join(__dirname, 'public')));  // ← ADD THIS LINE

// Keep everything else exactly as in the last working version
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
});

// In-memory sessions
const sessions = {};

// GET - Home / New Chat
app.get('/', (req, res) => {
  const sessionId = 'default';
  sessions[sessionId] = [];
  res.render('chat-stream', {
    history: [],
    sessionId,
    lastUserMessage: '',
    placeholderId: 'welcome'
  });
});

// POST - User sends message
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message?.trim();
  const sessionId = req.body.sessionId || 'default';

  if (!userMessage) return res.redirect('/');

  if (!sessions[sessionId]) sessions[sessionId] = [];

  // Add user message
  sessions[sessionId].push({ role: 'user', parts: [{ text: userMessage }] });

  // Render page with history + placeholder
  res.render('chat-stream', {
    history: sessions[sessionId],
    sessionId,
    lastUserMessage: userMessage,           // ← safe to pass directly
    placeholderId: `ai-${Date.now()}`
  });
});

// SSE - Real-time streaming
app.get('/stream', async (req, res) => {
  const sessionId = req.query.sessionId || 'default';
  const userMessage = decodeURIComponent(req.query.msg || '');

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  try {
    const chat = model.startChat({
      history: sessions[sessionId]?.slice(0, -1) || [],
    });

    const result = await chat.sendMessageStream(userMessage);
    let fullResponse = '';

    for await (const chunk of result.stream) {
      const text = chunk.text();
      fullResponse += text;
      res.write(`data: ${text}\n\n`);
    }

    res.write(`data: <END_STREAM>\n\n`);

    // Save AI response after streaming
    sessions[sessionId].push({ role: 'model', parts: [{ text: fullResponse }] });

  } catch (error) {
    console.error('Stream error:', error);
    res.write(`data: Sorry, something went wrong.\n\n`);
    res.write(`data: <END_STREAM>\n\n`);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Streaming Gemini Chat → http://localhost:${process.env.PORT}`);
});
*/
