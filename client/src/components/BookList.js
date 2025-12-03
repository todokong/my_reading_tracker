import React from 'react';
import BookItem from './BookItem';
import '../styles/BookList.css';

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>📖 아직 등록된 책이 없습니다.</p>
        <p>첫 번째 책을 추가해보세요!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <BookItem
          key={book._id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookList;
