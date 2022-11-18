//tsdrpfc

import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../authSlice';

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(state => state.auth.logging)

  const handleLoginClick = () => {
    // TODO: get username + pw from login form
    dispatch(
      authActions.login({
        username: '',
        password: '',
        onNavigate: () => navigate('/admin/dashboard'),
      })
    );
  };

  return (
    <Root className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        {/* elevation -> độ bóng  */}
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp;
            Fake Login
          </Button>
        </Box>
      </Paper>
    </Root>
  );
}

const classes = {
  root: 'root',
  box: 'box',
};
const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  [`& .${classes.box}`]: {
    padding: theme.spacing(2),
  },
}));
