import React from 'react';
import { Container, Button, Box } from '@mui/material';
import MarkdownSection from './MarkdownSection';

function ResumePage() {
  return (
    <Container maxWidth="md" style={{ paddingTop: '20px', textAlign: 'left' }}>
      <MarkdownSection filePath="/resume.md" />

      <Box display="flex" justifyContent="center" mt={4} mb={8}>
        <Button 
          variant="contained" 
          href="/digiorgio-resume.pdf"
          download="digiorgio-resume.pdf"
          sx={{ fontWeight: 'bold' }}
        >
          Download Resume
        </Button>
      </Box>
    </Container>
  );
}

export default ResumePage;