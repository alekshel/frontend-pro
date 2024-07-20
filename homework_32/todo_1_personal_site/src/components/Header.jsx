import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My portfolio
                </Typography>
                <Button color="inherit" component={RouterLink} to="/">
                    Home
                </Button>
                <Button color="inherit" component={RouterLink} to="/todo">
                    Tasker
                </Button>
                <Button color="inherit" component={RouterLink} to="/swapi">
                    SWAPI
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;