'use client';
import React from 'react';

const HeaderSection = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginBottom: '20px'
      }}
    >
      <h1
        style={{
          fontSize: '26px',
          fontWeight: 'bold',
          color: '#333',
          justifyContent: 'center',
          backgroundColor: '#fff',
          borderRadius: '10px',
          padding: '20px'
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default HeaderSection;
