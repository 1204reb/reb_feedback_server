const express = require('express');
const bodyParser = require('body-parser');
const saveFeedback = require('./feedbackHandler');

const app = express();
app.use(bodyParser.json());

app.post('/api/feedback', async (req, res) => {
  const { category, content, date } = req.body;
  try {
    await saveFeedback({ category, content, date });
    res.status(200).send({ message: '✅ 피드백 저장 완료' });
  } catch (err) {
    res.status(500).send({ message: '❌ 피드백 저장 실패', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('REB Feedback API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});