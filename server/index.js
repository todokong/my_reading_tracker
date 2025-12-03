// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const booksRouter = require('./routes/books');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// 데이터베이스 연결
connectDB();

app.use(cors()); // 필요한 경우 특정 도메인만 허용 가이드: cors({ origin: 'http://localhost:3000' })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트
app.use('/api/books', require('./routes/books'));
app.use('/api/reading-logs', require('./routes/readingLogs'));

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: '📚 독서 앱 API 서버' });
});

// 에러 핸들링
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '서버 오류가 발생했습니다' });
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행중입니다`);
});

// app.use('/books', booksRouter);

// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });
