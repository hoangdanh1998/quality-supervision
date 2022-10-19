import React from 'react';

import Box from '@mui/material/Box';

import { CodeText } from '../components/CodeText.js';
import { ButtonContainer } from './ButtonContainer.js';

// This container wraps the text box containing the code from server

export const CodeContainer = () => {
  return (
    <div>
      <Box className='test-code-box code-container'>
        <CodeText />
        <ButtonContainer />
      </Box>
    </div>
  );
};

