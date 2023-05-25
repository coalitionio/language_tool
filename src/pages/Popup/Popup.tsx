import { Box, Card, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import './Popup.css';
import { getRemoteURI } from './util';
type Mode = 'view' | 'create' | 'update';
const Popup = () => {
  const [mode, setMode] = useState<Mode>('view');

  useEffect(() => {
    let remoteUrl = getRemoteURI();
    while (!remoteUrl) {
      remoteUrl = window.prompt('Enter remote URL: ', 'http://localhost:5551');
    }
    if (remoteUrl) {
      localStorage.setItem('remoteUrl', remoteUrl);
    }
  }, []);
  return (
    <div className="App">
      <Box
        component={'div'}
        sx={{
          padding: '1rem 2rem',
        }}
      >
        <Typography color={'black'} fontSize={'1.5rem'} fontWeight={600}>
          Language Manage Tool
        </Typography>

        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
    </div>
  );
};

export default Popup;
