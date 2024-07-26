import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { TextField, Button, MenuItem, Box, Container, Grid, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import { fetchDestinations, fetchHotels } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const destinations = useSelector(state => state.destinations);

    useEffect(() => {
        dispatch(fetchDestinations());
    }, [dispatch]);

    const onSubmit = (values) => {
        dispatch(fetchHotels(values));
        navigate('/hotels');
    };

    const validate = values => {
        const errors = {};
        if (!values.destination) {
            errors.destination = 'Required';
        }
        return errors;
    };

    return (
        <Container maxWidth="md">
            <Box mt={8} mb={4}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Find Your Perfect Stay
                </Typography>
            </Box>
            <Form
                onSubmit={onSubmit}
                validate={validate}
                render={({ handleSubmit, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4}>
                                <Field name="destination">
                                    {({ input, meta }) => (
                                        <Select
                                            {...input}
                                            displayEmpty
                                            fullWidth
                                            error={meta.error && meta.touched}
                                        >
                                            <MenuItem value="" disabled>Select a destination</MenuItem>
                                            {destinations.map(dest => (
                                                <MenuItem key={dest.id} value={dest.name}>{dest.name}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Field name="checkIn">
                                    {({ input }) => (
                                        <TextField
                                            {...input}
                                            type="date"
                                            label="Check-in"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Field name="checkOut">
                                    {({ input }) => (
                                        <TextField
                                            {...input}
                                            type="date"
                                            label="Check-out"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={submitting || pristine}
                                    style={{ height: '100%' }}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </Container>
    );
};

export default Main;