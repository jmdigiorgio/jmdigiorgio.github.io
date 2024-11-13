import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function ResumePage() {
  const [resumeContent, setResumeContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/resume.md')
      .then(response => response.text())
      .then(text => setResumeContent(text))
      .catch(error => {
        console.error('Error loading resume:', error);
        setError(true);
      });
  }, []);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1rem' }}>
      {error && (
        <div 
          style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          There was an error loading the resume. Please try again later.
        </div>
      )}

      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ textAlign: 'left' }}>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{resumeContent}</ReactMarkdown>
        </div>
      </div>

      <div style={{ 
        display: 'flex',
        justifyContent: 'center'
      }}>
        <a 
          href="/digiorgio-resume.pdf" 
          download="digiorgio-resume.pdf"
          style={{
            background: 'linear-gradient(45deg, #3b5998, #8b9dc3)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-block',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.color = '#FFD700';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.color = 'white';
          }}
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default ResumePage;