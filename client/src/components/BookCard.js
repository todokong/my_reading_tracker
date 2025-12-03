// client/src/components/BookCard.js
import React from 'react';

function BookCard({ book }) {
  const { title, author, date_read, rating, notes } = book;
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.meta}>저자: {author ?? 'Unknown'}</p>
      <p style={styles.meta}>읽은 날짜: {date_read ?? 'N/A'}</p>
      <p style={styles.meta}>평점: {'★'.repeat(rating ?? 0)}</p>
      {notes && (
        <p style={styles.notes} title={notes}>
          메모: {notes.length > 60 ? notes.slice(0, 60) + '...' : notes}
        </p>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 12,
    margin: '8px 0',
    background: '#fff'
  },
  title: {
    margin: '0 0 6px 0'
  },
  meta: {
    margin: '4px 0',
    color: '#555',
    fontSize: 14
  },
  notes: {
    marginTop: 6,
    color: '#333',
    fontSize: 13
  }
};

export default BookCard;
