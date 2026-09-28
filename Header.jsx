import React from 'react';

function Header({ title }) {
  return (
    <header style={{ textAlign: 'center', marginBottom: '24px', marginTop: '10px' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
        {title}
      </h1>
      <p style={{ color: '#64748b', marginTop: '6px', fontSize: '15px', fontStyle: 'italic' }}>
        Manage Tasks. Meet Deadlines
      </p>
    </header>
  );
}

export default Header;