//phim tat: tsrpfc
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Header, Sidebar } from 'components/Common';
import { Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <Root className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.main}>
        <Outlet />
      </Box>
    </Root>
  );
}

const classes = {
  root: 'root',
  header: 'header',
  sidebar: 'sidebar',
  main: 'main',
  footer: 'footer',
};
const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 1,
    gridTemplateRows: 'auto',
    gridTemplateAreas: `"header header header header header"
  "sidebar main main main main"`,
  },
  [`& .${classes.header}`]: {
    gridArea: 'header',
  },
  [`& .${classes.sidebar}`]: {
    gridArea: 'sidebar',
    borderRight: '1px solid #ccc',
    height: '100vh',
  },
  [`& .${classes.main}`]: {
    gridArea: 'main',
    padding: '20px',
    height: '100vh',
  },
}));
