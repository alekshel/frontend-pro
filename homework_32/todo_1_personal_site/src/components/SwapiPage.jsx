import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeople } from '../features/swapi/swapiSlice';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

function SwapiPage() {
    const dispatch = useDispatch();
    const { people, loading, error } = useSelector(state => state.swapi);

    useEffect(() => {
        dispatch(fetchPeople());
    }, [dispatch]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Characters Star Wars
            </Typography>
            <List>
                {people.map((person) => (
                    <ListItem key={person.name}>
                        <ListItemText primary={person.name} secondary={`Birth day: ${person.birth_year}`} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

export default SwapiPage;