import hljs from 'highlight/lib/common';
import React, { ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DownloadIcon from '@mui/icons-material/Download';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  clearClipboardState, getSnippets, setServer, setSnippets
} from '../redux/reducers/clipboardSlice';
import { deleteProject } from '../redux/reducers/userInfoSlice';
import { ClipboardButton } from './ClipboardButton';

/*
This component will display code snippets from a given project in the database if a 
user is logged in, or from state if a user is not logged in
*/

export const Clipboard = () => {
  hljs.configure({
    ignoreUnescapedHTML: true
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectId = Number(useParams().projectId);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const buttonText = isLoggedIn ? 'Delete Project' : 'Clear Clipboard';
  const projects = useAppSelector((state) => state.userInfo.projectsInfo);
  const server: string = useAppSelector((state) => state.clipboard.server);
  const codeDisplay: string = useAppSelector(
    (state) => state.clipboard.codeDisplay
  );

  let projectName = '';
  for (const project of projects) {
    if (project.project_id === projectId) {
      projectName = project.project_name;
      break;
    }
  }

  const updateServer = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setServer(e.target.value));
  };

  const handleClear = () => { 
    if (isLoggedIn) {
      dispatch(deleteProject(projectId));
      navigate('/');
    } else {
      dispatch(clearClipboardState());
    }
  };

  const handleDownload = () => {
    const blob = new Blob([codeDisplay], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'supertest';
    link.href = url;
    link.click();
  };

  useEffect(() => {
    if (isLoggedIn) { 
      // fetch code snippets from db if user logged in
      dispatch(getSnippets(projectId));
    }
    else {
      const clipboardData = sessionStorage.getItem('codeSnippets');
      if (clipboardData) dispatch(setSnippets(JSON.parse(clipboardData)));
    }
    hljs.highlightAll();
  });

  return (
    <div className="page-body">
      <Box
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          width: .8,
        }}
        className='code-container'
        data-testid='code-container'
      >
        <TextField
          className="text-display"
          label="Server URL"
          sx={{ minWidth: 200 }}
          value={server}
          error={server === ''}
          onChange={updateServer}
        />
        <Box 
          className="clipboard-code-container"
          sx={{ 
            width: .85,
            height: 500,
            overflow: 'auto',
            backgroundColor: '#282C34',
            borderRadius: 2,
            position: 'relative'
          }}
        >
          <div id="main-clipboard">
            <pre>
              <code className='javascript'>
                {codeDisplay}
              </code> 
            </pre>
          </div>
          <ClipboardButton />
        </Box> 
        <div>
          <Button
            onClick={handleDownload}
            sx={{ flexDirection: 'column' }}
          >
            <DownloadIcon /> 
          Download File
          </Button>
          <Button
            onClick={handleClear}
            sx={{ flexDirection: 'column' }}
          >
            <DeleteForeverIcon /> 
            {buttonText}
          </Button>
        </div>
      </Box>
    </div>
  );
};