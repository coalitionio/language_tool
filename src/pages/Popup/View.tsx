import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Table,
  TableContainer,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { doFetch } from './util';

type Props = {
  onCardClick?: (lang: any) => void;
  onSelectEdit?: (item: any) => void;
};

const View = ({ onCardClick, onSelectEdit }: Props) => {
  const [list, setList] = useState<any[]>();
  useEffect(() => {
    doFetch('/client_language', {
      method: 'get',
    }).then((val) => setList(val.data));
  }, []);
  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell align="center">Menu</TableCell>
              <TableCell align="center">Value</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  sx={{
                    maxWidth: 'fit-content',
                  }}
                  scope="row"
                >
                  {row.key}
                </TableCell>
                <TableCell align="center">{row.menu}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {Object.keys(row.value).length > 0 &&
                    Object.keys(row.value).map((key) => (
                      <Chip label={`${key} : ${row.value[key]}`}></Chip>
                    ))}
                </TableCell>
                <TableCell>
                  <Box display={'flex'}>
                    <IconButton
                      onClick={() => {
                        doFetch('/client_language?id=' + row._id, {
                          method: 'delete',
                        }).then((data) => {
                          if (data.status == 'success') {
                            doFetch('/client_language', {
                              method: 'get',
                            }).then((val) => setList(val.data));
                          }
                        });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        onSelectEdit?.(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {list?.map((item) => {
        return (
          <Card key={item?.id || item?._id} style={{ cursor: 'pointer' }}>
            <Typography>{item?.key}</Typography>
            <Button>Update</Button>
            <Button>X</Button>
          </Card>
        );
      })} */}
    </Stack>
  );
};

export default View;
