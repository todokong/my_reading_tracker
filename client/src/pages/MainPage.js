import React, { useState } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import '../styles/MainPage.css';

function MainPage({ books, onAddBook, onUpdateBook, onDeleteBook }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [sortBy, setSortBy] = useState('date'); // date, rating, title
  const [submitting, setSubmitting] = useState(false);

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsFormOpen(true);
  };

  const handleSubmit = async (bookData) => {
    setSubmitting(true);
    
    try {
      let result;
      if (editingBook) {
        result = await onUpdateBook(editingBook._id, bookData);
      } else {
        result = await onAddBook(bookData);
      }

      if (result.success) {
        setIsFormOpen(false);
        setEditingBook(null);
      } else {
        alert(result.error || '작업에 실패했습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await onDeleteBook(id);
    if (!result.success) {
      alert(result.error || '삭제에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingBook(null);
  };

  // 정렬된 책 목록
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.readDate) - new Date(a.readDate);
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // 통계 계산
  const totalBooks = books.length;
  const averageRating = totalBooks > 0
    ? (books.reduce((sum, book) => sum + book.rating, 0) / totalBooks).toFixed(1)
    : 0;

  return (
    <div className="main-page">
      <header className="header">
        <h1>📚 나의 독서 기록</h1>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">총 읽은 책</span>
            <span className="stat-value">{totalBooks}권</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">평균 평점</span>
            <span className="stat-value">⭐ {averageRating}</span>
          </div>
        </div>
      </header>

      <div className="controls">
        <button 
          className="add-button"
          onClick={() => setIsFormOpen(true)}
        >
          ➕ 새 책 추가
        </button>
        
        <div className="sort-controls">
          <label>정렬: </label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">읽은 날짜순</option>
            <option value="rating">평점순</option>
            <option value="title">제목순</option>
          </select>
        </div>
      </div>

      {isFormOpen && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <BookForm
              book={editingBook}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <BookList
        books={sortedBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default MainPage;
