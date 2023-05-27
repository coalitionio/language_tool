import {
  Box,
  Button,
  Card,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import './Popup.css';
import { getRemoteURI } from './util';
import useInit from './hooks/useInit';
import View from './View';
import Write from './Write';
type Mode = 'view' | 'create' | 'update';
const Popup = () => {
  const [mode, setMode] = useState<Mode>('view');
  const { types } = useInit();
  const [tab, setTab] = useState<any>('client_lang');
  const [editItem, setEditItem] = useState(null);
  useEffect(() => {
    if (types && types[0]) {
      console.log(types[0]?.value);

      setTab(types[0]?.value);
    }
  }, [types]);
  useEffect(() => {
    console.log(tab);
  }, [tab]);
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
      </Box>
      <Tabs
        value={tab?.label}
        onChange={(e, val) => {
          console.log('Tab change', val);
          setTab(val);
        }}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        {types?.map((type: any) => (
          <Tab label={type.label} value={type.value} />
        ))}
      </Tabs>
      <Box display="flex" justifyContent="flex-end" margin={'1rem'}>
        <Button
          sx={{
            marginLeft: 'auto',
          }}
          color="secondary"
          variant="contained"
          onClick={() => {
            setMode('create');
          }}
        >
          Add
        </Button>
      </Box>
      {mode === 'view' ? (
        <View
          onSelectEdit={(item) => {
            setEditItem(item);
            setMode('update');
          }}
        />
      ) : (
        <Write
          init={editItem}
          backHandle={() => {
            setMode('view');
            setEditItem(null);
          }}
          reloadHandle={() => {
            setEditItem(null);
            setMode('view');
          }}
        />
      )}
    </div>
  );
};

export default Popup;
