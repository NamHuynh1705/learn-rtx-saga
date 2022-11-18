import {CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {useEffect} from 'react';
import {dashboardActions} from './dashboardSlice';

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Content = styled(Box)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderTop: '1px solid #ccc',
  height: '351px',
}));

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', minWidth: 135},
  {field: 'name', headerName: 'Name', minWidth: 165},
  {field: 'gender', headerName: 'Gender'},
  {field: 'mark', headerName: 'Mark'},
];
const columnsCity: GridColDef[] = [
  {field: 'name', headerName: 'Name', minWidth: 130},
  {field: 'gender', headerName: 'Gender'},
  {field: 'mark', headerName: 'Mark'},
];

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const statistics = useAppSelector((state) => state.dashboard.statistics);
  const loading = useAppSelector((state) => state.dashboard.loading);
  const highestStudentList = useAppSelector((state) => state.dashboard.highestStudentList);
  const lowestStudentList = useAppSelector((state) => state.dashboard.lowestStudentList);
  const rankingByCityList = useAppSelector((state) => state.dashboard.rankingByCityList);

  const fetchData = () => {
    const params = {
      _sort: 'mark',
      _order: 'desc' as 'desc',
    };
    dispatch(dashboardActions.fetchData(params));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{textAlign: 'center'}}>
          <CircularProgress size={50} color='primary' sx={{justifyContent: 'center'}} />
        </Box>
      ) : (
        <>
          <Box sx={{width: '100%'}}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
              <Grid item xs={3}>
                <Item>Male: {statistics?.maleCount || 0}</Item>
              </Grid>
              <Grid item xs={3}>
                <Item>Female: {statistics?.femaleCount || 0}</Item>
              </Grid>
              <Grid item xs={3}>
                <Item>Good Students: {statistics?.highMarkCount || 0}</Item>
              </Grid>
              <Grid item xs={3}>
                <Item>Weak Students: {statistics?.lowMartCount || 0}</Item>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{width: '100%', marginTop: '70px'}}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
              <Grid item xs={6}>
                <Item>
                  Top 5 Students
                  <Content>
                    <DataGrid rows={highestStudentList} columns={columns} pageSize={5} hideFooter />
                  </Content>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  Top 5 Lowest Mask
                  <Content>
                    <DataGrid rows={lowestStudentList} columns={columns} pageSize={5} hideFooter />
                  </Content>
                </Item>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{width: '100%', marginTop: '70px'}}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
              <Grid item xs={4}>
                <Item>
                  TP.HCM
                  <Content>
                    <DataGrid
                      rows={rankingByCityList.listHCM}
                      columns={columnsCity}
                      pageSize={5}
                      hideFooter
                    />
                  </Content>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  Ha Noi
                  <Content>
                    <DataGrid
                      rows={rankingByCityList.listHN}
                      columns={columnsCity}
                      pageSize={5}
                      hideFooter
                    />
                  </Content>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>
                  Da Nang
                  <Content>
                    <DataGrid
                      rows={rankingByCityList.listDN}
                      columns={columnsCity}
                      pageSize={5}
                      hideFooter
                    />
                  </Content>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}
