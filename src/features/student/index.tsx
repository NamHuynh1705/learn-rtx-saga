import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress, IconButton, InputBase, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import _ from 'lodash';
import { ListParams, Student } from 'models';
import { useCallback, useEffect, useState } from 'react';
import { studentActions } from './studentSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import { totalPagePagination } from 'utils';
import ModalCreateStudent from './Modal';

const BoxPagination = styled(Box)(({ theme }) => ({
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'left',
}));

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '1px solid #ccc',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function StudentFeature() {
  const dispatch = useAppDispatch();
  const listStudent = useAppSelector((state) => state.student.listStudent);
  const loading = useAppSelector((state) => state.student.loading);
  const reloadList = useAppSelector((state) => state.student.reloadList);
  const pagination = useAppSelector((state) => state.student.pagination);
  const [search, setSearch] = useState<string>('');
  const [openModal, setOpenModal] = useState(false);

  const [params, setParams] = useState<ListParams>({
    _limit: 10,
    _page: 1,
    _sort: '',
    _order: 'asc',
    q: null,
  });

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setParams((prevState) => {
      return { ...prevState, _page: value };
    });
  };

  const debounceSearch = useCallback(
    _.debounce(
      (value) =>
        setParams((prevState) => {
          return {...prevState, q: value, _page: 1};
        }),
      500
    ),
    []
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    debounceSearch(value);
  };

  const handleRemoveStudent = (student: Student) => {
    dispatch(studentActions.removeStudent(student));
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const fetchData = () => {
    dispatch(studentActions.fetchData(params));
  };

  useEffect(() => {
    fetchData();
  }, [params, reloadList]);

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Paper component='form' sx={{display: 'flex', alignItems: 'center', width: 350}}>
          <InputBase
            sx={{ml: 1, flex: 1}}
            placeholder='Search Students'
            inputProps={{'aria-label': 'search student'}}
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <IconButton type='button' sx={{p: '10px'}} aria-label='search'>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button variant='contained' startIcon={<AddCircleOutlineIcon />} onClick={handleOpenModal}>
          Create Student
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align='left'>NAME</TableCell>
              <TableCell align='left'>AGE</TableCell>
              <TableCell align='left'>GENDER</TableCell>
              <TableCell align='left'>CITY</TableCell>
              <TableCell align='left'>MARK</TableCell>
              <TableCell align='left'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} sx={{textAlign: 'center'}}>
                  <CircularProgress size={40} color='primary' sx={{justifyContent: 'center'}} />
                </TableCell>
              </TableRow>
            ) : listStudent?.length > 0 ? (
              listStudent?.map((student, index) => (
                <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell align='left'>{student.name}</TableCell>
                  <TableCell align='left'>{student.age}</TableCell>
                  <TableCell align='left'>{student.gender}</TableCell>
                  <TableCell align='left'>{student.city}</TableCell>
                  <TableCell align='left'>{student.mark}</TableCell>
                  <TableCell align='left'>
                    <IconButton aria-label='delete' onClick={() => handleRemoveStudent(student)}>
                      <DeleteIcon color='action' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{textAlign: 'center'}}>
                  <h4 className='mt-5 d-flex justify-content-center'>
                    There is currently no data available
                  </h4>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!loading && pagination && pagination?._totalRows > 0 && (
        <BoxPagination>
          <Pagination
            count={totalPagePagination(pagination)}
            page={pagination._page}
            onChange={handlePagination}
          />
        </BoxPagination>
      )}

      {/* Modal Create Student  */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{...styleModal, width: 300}}>
          <ModalCreateStudent onClose={handleCloseModal} />
          <Button onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
