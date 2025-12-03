const express = require('express');
const router = express.Router();
const ReadingLog = require('../models/ReadingLog');

// 특정 책의 독서 기록 조회
router.get('/book/:bookId', async (req, res) => {
  try {
    const logs = await ReadingLog.find({ bookId: req.params.bookId })
      .sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 독서 기록 추가
router.post('/', async (req, res) => {
  const log = new ReadingLog(req.body);
  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 독서 기록 삭제
router.delete('/:id', async (req, res) => {
  try {
    const log = await ReadingLog.findById(req.params.id);
    if (!log) {
      return res.status(404).json({ message: '기록을 찾을 수 없습니다' });
    }
    await log.deleteOne();
    res.json({ message: '기록이 삭제되었습니다' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
