import React from 'react';
import { Paper, Typography } from '@mui/material';

const DataDisplaySection = ({ title, data, style = {} }) => (
  <Paper elevation={3} style={{ 
    padding: '20px', 
    backgroundColor: '#f5f5f5',
    marginBottom: '20px',
    ...style
  }}>
    <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
      {title}
    </Typography>
    <div style={{ 
      maxHeight: '300px', 
      overflow: 'auto',
      border: '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff'
    }}>
      <pre style={{ 
        margin: 0,
        padding: '12px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        {data || `Loading ${title}...`}
      </pre>
    </div>
  </Paper>
);

export default DataDisplaySection;