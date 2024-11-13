import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Paper, Container, Typography } from '@mui/material';
import rehypeRaw from 'rehype-raw';
import { Network } from 'vis-network';

const Reqify = () => {
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');
  const [content4, setContent4] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const networkRef = useRef(null);
  const networkContainerRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const mdRes1 = await fetch(`/reqify/part1.md`);
        const mdText1 = await mdRes1.text();
        setContent1(mdText1);

        const mdRes2 = await fetch(`/reqify/part2.md`);
        const mdText2 = await mdRes2.text();
        setContent2(mdText2);

        const mdRes3 = await fetch(`/reqify/part3.md`);
        const mdText3 = await mdRes3.text();
        setContent3(mdText3);

        const mdRes4 = await fetch(`/reqify/part4.md`);
        const mdText4 = await mdRes4.text();
        setContent4(mdText4);

        const jsonRes = await fetch('/reqify/requirements.json');
        const jsonText = await jsonRes.json();
        setJsonData(jsonText);

        const csvRes = await fetch('/reqify/triples.csv');
        const csvText = await csvRes.text();
        setCsvData(csvText);

        const graphRes = await fetch('/reqify/graph.json');
        const graphText = await graphRes.json();
        
        const neoGraph = graphText[0].graph;
        const transformedData = {
          nodes: neoGraph.nodes.map(node => ({
            id: node.id,
            label: node.properties.name || String(node.id),
            title: node.properties.name || String(node.id),
            font: { size: 12 },
            color: {
              background: '#D2E5FF',
              border: '#2B7CE9',
              highlight: { background: '#95D5FF', border: '#2B7CE9' }
            },
            shape: 'box'
          })),
          edges: neoGraph.edges
            .filter(edge => edge.from !== null && edge.to !== null)
            .map(edge => ({
              from: edge.from,
              to: edge.to,
              label: edge.label || '',
              font: { size: 8, align: 'middle' },
              arrows: 'to',
              color: { color: '#848484' }
            }))
        };
        setGraphData(transformedData);
      } catch (err) {
        console.error('Error fetching content:', err);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (!graphData || !networkContainerRef.current) return;

    try {
      const options = {
        nodes: {
          shape: 'box',
          margin: 10,
          widthConstraint: {
            maximum: 200
          }
        },
        edges: {
          width: 1,
          smooth: {
            type: 'continuous'
          }
        },
        physics: {
          stabilization: {
            enabled: true,
            iterations: 1000
          },
          barnesHut: {
            gravitationalConstant: -2000,
            centralGravity: 0.3,
            springLength: 95,
            springConstant: 0.04,
            damping: 0.09
          }
        },
        layout: {
          improvedLayout: false  // Changed this from true to false
        }
      };

      networkRef.current = new Network(
        networkContainerRef.current,
        graphData,
        options
      );

      console.log('Network created successfully');
    } catch (err) {
      console.error('Error creating network:', err);
    }

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [graphData]);

  return (
    <Container maxWidth="md" style={{ paddingTop: '20px', textAlign: 'left' }}>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content1 || 'Loading part 1...'}
        </ReactMarkdown>
      </Paper>

      <Paper elevation={3} style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5',
        marginBottom: '20px'
      }}>
        <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
          Extracted Requirements
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
            {jsonData ? JSON.stringify(jsonData, null, 2) : 'Loading JSON data...'}
          </pre>
        </div>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content2 || 'Loading part 2...'}
        </ReactMarkdown>
      </Paper>

      <Paper elevation={3} style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5',
        marginBottom: '20px'
      }}>
        <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
          Generated Triples
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
            {csvData || 'Loading CSV data...'}
          </pre>
        </div>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content3 || 'Loading part 3...'}
        </ReactMarkdown>
      </Paper>

      <Paper elevation={3} style={{ 
        padding: '20px', 
        backgroundColor: '#f5f5f5',
        marginBottom: '20px'
      }}>
        <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
          Requirements Knowledge Graph
        </Typography>
        <div 
          ref={networkContainerRef}
          style={{ 
            height: '600px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff'
          }}
        />
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {content4 || 'Loading part 4...'}
        </ReactMarkdown>
      </Paper>
    </Container>
  );
};

export default Reqify;