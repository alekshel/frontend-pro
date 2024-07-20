import React from 'react';
import { Typography, Paper, Grid, Chip } from '@mui/material';

function Home() {
    const skills = ['Python', 'Django', 'Flask', 'JavaScript', 'React', 'Redux'];

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Sheludchenko Oleksii
            </Typography>
            <Typography variant="h6" gutterBottom>
                Fullstack developer (Python/JS)
            </Typography>
            <Typography paragraph>
                Short description about me. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Skills:
            </Typography>
            <Grid container spacing={1}>
                {skills.map((skill, index) => (
                    <Grid item key={index}>
                        <Chip label={skill} />
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

export default Home;