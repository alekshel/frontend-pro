import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';

export const HEADER_HEIGHT = 64;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: 'none',
    transition: 'all 0.3s ease-in-out',
}));

const StyledToolbar = styled(Toolbar)({
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
});

const LogoTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: 'white',
    marginLeft: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'white',
        transform: 'translateX(-100%)',
        transition: 'transform 0.3s ease',
    },
    '&:hover::after': {
        transform: 'translateX(0)',
    },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: '250px',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: 'white',
}));

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Main', path: '/' },
        { text: 'About', path: '/about' },
        { text: 'Hotels', path: '/hotels' },
    ];

    const drawer = (
        <div>
            <CloseButton onClick={handleDrawerToggle}>
                <CloseIcon />
            </CloseButton>
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={RouterLink}
                        to={item.path}
                        onClick={handleDrawerToggle}
                    >
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <StyledAppBar position="fixed">
            <StyledToolbar>
                <LogoTypography variant="h5" component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
                    BookingApp
                </LogoTypography>
                {isMobile ? (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : (
                    <div>
                        {menuItems.map((item) => (
                            <NavButton key={item.text} component={RouterLink} to={item.path}>
                                {item.text}
                            </NavButton>
                        ))}
                    </div>
                )}
            </StyledToolbar>
            <StyledDrawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                {drawer}
            </StyledDrawer>
        </StyledAppBar>
    );
};

export default Header;