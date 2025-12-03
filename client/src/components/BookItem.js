import React from 'react';
import '../styles/BookItem.css';

function BookItem({ book, onEdit, onDelete }) {
  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="book-item">
      <div className="book-header">
        <h3 className="book-title">{book.title}</h3>
        <div className="book-actions">
          <button 
            className="edit-btn"
            onClick={() => onEdit(book)}
            title="수정"
          >
            ✏️
          </button>
          <button 
            className="delete-btn"
            onClick={() => onDelete(book._id)}
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="book-info">
        <p className="book-author">✍️ {book.author}</p>
        <p className="book-date">📅 {book.readDate && new Date(book.readDate).toISOString().split('T')[0]}</p>
        <p className="book-rating">{renderStars(book.rating)}</p>
      </div>
      
      {book.review && (
        <div className="book-review">
          <p>{book.review}</p>
        </div>
      )}
    </div>
  );
}

export default BookItem;
