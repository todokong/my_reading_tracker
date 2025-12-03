import React, { useState, useEffect } from 'react';
import '../styles/BookForm.css';

function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    readDate: new Date().toISOString().split('T')[0],
    rating: 5,
    review: '' 
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    }
  }, [book]);

  const handleChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) {
      alert('제목과 저자는 필수입니다.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? '📝 책 수정' : '➕ 새 책 추가'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">제목 *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="책 제목을 입력하세요"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">저자 *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="저자명을 입력하세요"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="readDate">읽은 날짜</label>
        <input
          type="date"
          id="readDate"
          name="readDate"
          value={formData.readDate && new Date(formData.readDate).toISOString().split('T')[0]}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">평점 ({formData.rating}/5)</label>
        <div className="rating-input">
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
          <span className="rating-display">
            {'⭐'.repeat(formData.rating)}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="review">리뷰</label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="책에 대한 감상이나 메모를 남겨보세요"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="submit-btn">
          {book ? '수정하기' : '추가하기'}
        </button>
      </div>
    </form>
  );
}

export default BookForm;
