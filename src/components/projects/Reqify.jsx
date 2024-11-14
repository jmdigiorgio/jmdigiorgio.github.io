import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import MarkdownSection from '../MarkdownSection';
import DataDisplaySection from '../DataDisplaySection';
import NetworkGraphSection from '../NetworkGraphSection';

const Reqify = () => {
  const [jsonData, setJsonData] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch JSON data
        const jsonRes = await fetch('/reqify/requirements.json');
        const jsonText = await jsonRes.json();
        setJsonData(jsonText);

        // Fetch CSV data
        const csvRes = await fetch('/reqify/triples.csv');
        const csvText = await csvRes.text();
        setCsvData(csvText);

        // Fetch and transform graph data
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
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" style={{ paddingTop: '20px', textAlign: 'left' }}>
      <MarkdownSection filePath="/reqify/part1.md" />
      
      <DataDisplaySection 
        title="Extracted Requirements" 
        data={jsonData ? JSON.stringify(jsonData, null, 2) : null}
      />

      <MarkdownSection filePath="/reqify/part2.md" />
      
      <DataDisplaySection 
        title="Generated Triples" 
        data={csvData}
      />

      <MarkdownSection filePath="/reqify/part3.md" />

      <NetworkGraphSection 
        title="Requirements Graph (takes a moment to load)"
        graphData={graphData}
      />

      <MarkdownSection filePath="/reqify/part4.md" />
    </Container>
  );
};

export default Reqify;