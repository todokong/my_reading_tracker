const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  readDate: {
    type: Date
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  review: {
    type: String
  },
  // isbn: {
  //   type: String,
  //   unique: true,
  //   sparse: true
  // },
  // coverImage: {
  //   type: String,
  //   default: ''
  // },
  // totalPages: {
  //   type: Number,
  //   default: 0
  // },
  // category: {
  //   type: String,
  //   enum: ['소설', '에세이', '자기계발', '경제경영', '과학', '기타'],
  //   default: '기타'
  // },
  // status: {
  //   type: String,
  //   enum: ['읽고싶은', '읽는중', '완독'],
  //   default: '읽고싶은'
  // },
  // startDate: {
  //   type: Date
  // },
  // endDate: {
  //   type: Date
  // },
}, {
  timestamps: true
});

// 책 삭제 전에 관련 독서 기록도 삭제
// bookSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
//   try {
//     const ReadingLog = mongoose.model('ReadingLog');
//     await ReadingLog.deleteMany({ bookId: this._id });
//     console.log(`📚 책 ID ${this._id}의 독서 기록 삭제 완료`);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // findByIdAndDelete 등을 사용할 경우를 위한 쿼리 미들웨어
// bookSchema.pre('findOneAndDelete', async function(next) {
//   try {
//     const book = await this.model.findOne(this.getFilter());
//     if (book) {
//       const ReadingLog = mongoose.model('ReadingLog');
//       await ReadingLog.deleteMany({ bookId: book._id });
//       console.log(`📚 책 ID ${book._id}의 독서 기록 삭제 완료`);
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model('Book', bookSchema);
