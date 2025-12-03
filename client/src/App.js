import React, { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import { getBooks, createBook, updateBook, deleteBook } from './api/books';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 컴포넌트 마운트시 책 목록 가져오기
  useEffect(() => {
    fetchBooks();
  }, []);

  // 책 목록 가져오기
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError('책 목록을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 책 추가
  const addBook = async (bookData) => {
    try {
      const newBook = await createBook(bookData);
      setBooks([...books, newBook]);
      return { success: true };
    } catch (err) {
      setError('책 추가에 실패했습니다.');
      return { success: false, error: err.message };
    }
  };

  // 책 수정
  const handleUpdateBook = async (id, bookData) => {
    try {
      const updatedBook = await updateBook(id, bookData);
      setBooks(books.map(book => 
        book._id === id ? updatedBook : book
      ));
      return { success: true };
    } catch (err) {
      setError('책 수정에 실패했습니다.');
      return { success: false, error: err.message };
    }
  };

  // 책 삭제
  const handleDeleteBook = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return { success: true };
    
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book._id !== id));
      return { success: true };
    } catch (err) {
      setError('책 삭제에 실패했습니다.');
      return { success: false, error: err.message };
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="App">
      <MainPage
        books={books}
        onAddBook={addBook}
        onUpdateBook={handleUpdateBook}
        onDeleteBook={handleDeleteBook}
      />
    </div>
  );
}

export default App;
