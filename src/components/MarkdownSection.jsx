import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Paper } from '@mui/material';

const MarkdownSection = ({ filePath, style = {} }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(filePath);
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error(`Error fetching markdown content from ${filePath}:`, err);
        setContent(`Failed to load content from ${filePath}`);
      }
    };

    fetchContent();
  }, [filePath]);

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', ...style }}>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {content || `Loading ${filePath}...`}
      </ReactMarkdown>
    </Paper>
  );
};

export default MarkdownSection;