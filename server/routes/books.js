const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// 모든 책 조회
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 특정 책 조회
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: '책을 찾을 수 없습니다' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 책 추가
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 책 수정
router.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: '책을 찾을 수 없습니다' });
    }

    Object.keys(req.body).forEach(key => {
      book[key] = req.body[key];
    });

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 책 삭제
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: '책을 찾을 수 없습니다' });
    }
    await book.deleteOne();
    res.json({ message: '책이 삭제되었습니다' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
