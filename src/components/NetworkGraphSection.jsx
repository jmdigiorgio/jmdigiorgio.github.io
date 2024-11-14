import React, { useEffect, useRef } from 'react';
import { Paper, Typography } from '@mui/material';
import { Network } from 'vis-network';

const NetworkGraphSection = ({ title, graphData, style = {} }) => {
  const networkRef = useRef(null);
  const networkContainerRef = useRef(null);

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
          improvedLayout: false
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
    <Paper elevation={3} style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5',
      marginBottom: '20px',
      ...style
    }}>
      <Typography variant="h6" gutterBottom style={{ fontSize: '1rem' }}>
        {title}
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
  );
};

export default NetworkGraphSection;