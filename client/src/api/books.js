const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// 모든 책 가져오기
export const getBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/books`);
    if (!response.ok) throw new Error('책 목록을 가져오는데 실패했습니다.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// 책 추가
export const createBook = async (bookData) => {
  try {
    const response = await fetch(`${API_URL}/api/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData)
    });
    
    if (!response.ok) throw new Error('책 추가에 실패했습니다.');
    return await response.json();
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};

// 책 수정
export const updateBook = async (id, bookData) => {
  try {
    const response = await fetch(`${API_URL}/api/books/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData)
    });
    
    if (!response.ok) throw new Error('책 수정에 실패했습니다.');
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// 책 삭제
export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/books/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('책 삭제에 실패했습니다.');
    return await response.json();
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};
