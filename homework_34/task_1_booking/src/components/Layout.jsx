import React from 'react';
import { Box } from '@mui/material';
import { HEADER_HEIGHT } from './Header';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({ theme }) => ({
    paddingTop: `${HEADER_HEIGHT}px`,
    minHeight: 'calc(100vh - 116px)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    backgroundImage: `
    linear-gradient(30deg, ${theme.palette.background.paper} 12%, transparent 12.5%, transparent 87%, ${theme.palette.background.paper} 87.5%, ${theme.palette.background.paper}),
    linear-gradient(150deg, ${theme.palette.background.paper} 12%, transparent 12.5%, transparent 87%, ${theme.palette.background.paper} 87.5%, ${theme.palette.background.paper}),
    linear-gradient(30deg, ${theme.palette.background.paper} 12%, transparent 12.5%, transparent 87%, ${theme.palette.background.paper} 87.5%, ${theme.palette.background.paper}),
    linear-gradient(150deg, ${theme.palette.background.paper} 12%, transparent 12.5%, transparent 87%, ${theme.palette.background.paper} 87.5%, ${theme.palette.background.paper}),
    linear-gradient(60deg, ${theme.palette.background.paper}77 25%, transparent 25.5%, transparent 75%, ${theme.palette.background.paper}77 75%, ${theme.palette.background.paper}77),
    linear-gradient(60deg, ${theme.palette.background.paper}77 25%, transparent 25.5%, transparent 75%, ${theme.palette.background.paper}77 75%, ${theme.palette.background.paper}77)
  `,
    backgroundSize: '80px 140px',
    backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
}));

const Layout = ({ children }) => {
    return (
        <StyledBox>
            {children}
        </StyledBox>
    );
};

export default Layout;