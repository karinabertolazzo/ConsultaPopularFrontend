import React from 'react';

const ResponsiveContainer = ({ children }) => {
  const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    padding: '2rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    fontFamily: '"Segoe UI", sans-serif',
    
    // Media queries incorporadas
    '@media (max-width: 768px)': {
      padding: '1rem'
    },
    '@media (max-width: 480px)': {
      padding: '0.5rem'
    }
  };

  return <div style={containerStyle}>{children}</div>;
};

export default ResponsiveContainer;