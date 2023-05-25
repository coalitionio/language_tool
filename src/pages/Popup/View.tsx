import { Box, Button, Card, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { doFetch } from './util';

type Props = {
  onCardClick: (lang: any) => void;
};

const View = (props: Props) => {
  const [list, setList] = useState<any[]>();
  useEffect(() => {
    // doFetch('/', {
    //   method: 'get',
    // });
  }, []);
  return (
    <Stack>
      {list?.map((item) => {
        return (
          <Card key={item?.id || item?._id} style={{ cursor: 'pointer' }}>
            <Typography>{item?.key}</Typography>
            <Button>Update</Button>
            <Button>X</Button>
          </Card>
        );
      })}
    </Stack>
  );
};

export default View;
