import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Paper, Container } from '@mui/material';
import rehypeRaw from 'rehype-raw';

const Reqify = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        console.log('Attempting to fetch markdown file...');
        // Adding a random parameter to prevent cache issues
        const res = await fetch(`/reqify/intro.md?${Date.now()}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const text = await res.text();
        console.log('Markdown content fetched:', text);
        setContent(text);
      } catch (err) {
        console.error('Error fetching markdown file:', err);
        setError('Failed to load content. Please try again later.');
      }
    };

    fetchMarkdown();
  }, []);

  return (
    <Container maxWidth="md" style={{ paddingTop: '20px', textAlign: 'left' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {error ? (
          <p>{error}</p>
        ) : content ? (
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
        ) : (
          <p>Loading content or no content available.</p>
        )}
      </Paper>
    </Container>
  );
};

export default Reqify;
