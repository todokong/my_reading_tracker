const mongoose = require('mongoose');

const readingLogSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  pagesRead: {
    type: Number,
    required: true,
    min: 0
  },
  currentPage: {
    type: Number,
    required: true,
    min: 0
  },
  memo: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ReadingLog', readingLogSchema);
