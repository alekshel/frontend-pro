import React from 'react';
import { Typography, Container, Link } from '@mui/material';

function Footer() {
    return (
        <Container maxWidth="sm" style={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
                © {new Date().getFullYear()} Sheludchenko Oleksii
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <Link href="mailto:your.email@example.com">myemail@gmail.com</Link>
            </Typography>
        </Container>
    );
}

export default Footer;