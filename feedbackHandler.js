
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const feedbackDbId = process.env.FEEDBACK_DB_ID;

async function saveFeedback({ category, content, date }) {
  const page = {
    parent: { database_id: feedbackDbId },
    properties: {
      '카테고리': { select: { name: category } },
      '날짜': { date: { start: date } },
      '내용': {
        rich_text: [{ text: { content } }],
      },
    },
  };

  try {
    const response = await notion.pages.create(page);
    console.log('✅ 피드백 저장 완료:', response.id);
  } catch (error) {
    console.error('❌ 피드백 저장 실패:', error.message);
  }
}

module.exports = saveFeedback;
