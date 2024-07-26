import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Rating,
    Box,
    Chip
} from '@mui/material';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    },
}));

const StyledCardMedia = styled(CardMedia)({
    paddingTop: '56.25%', // 16:9 aspect ratio
});

const HotelCard = ({ hotel }) => (
    <StyledCard>
        <StyledCardMedia
            image={hotel.image || 'https://via.placeholder.com/300x200?text=No+Image'}
            title={hotel.name}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {hotel.name}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                    {hotel.destination}
                </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Rating value={hotel.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" ml={1}>
                    ({hotel.rating})
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Chip
                    icon={<AttachMoneyIcon />}
                    label={`${hotel.price}/night`}
                    color="primary"
                    variant="outlined"
                />
            </Box>
        </CardContent>
    </StyledCard>
);

const Hotels = () => {
    const hotels = useSelector(state => state.hotels);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" mb={4}>
                Available Hotels
            </Typography>
            <Grid container spacing={4}>
                {hotels.map(hotel => (
                    <Grid item key={hotel.id} xs={12} sm={6} md={4}>
                        <HotelCard hotel={hotel} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Hotels;