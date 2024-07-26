import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const HeroSection = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: theme.spacing(6),
}));

const HeroContent = styled(Box)(({ theme }) => ({
    maxWidth: '800px',
    padding: theme.spacing(3),
}));

const About = () => {
    const advantages = [
        "Wide selection of hotels worldwide",
        "Best prices and exclusive offers",
        "Convenient and fast search",
        "Detailed information and photos of hotels",
        "Reviews from real travelers",
        "24/7 customer support"
    ];

    const testimonials = [
        { name: "Anna S.", text: "Great service! Found the perfect hotel for my vacation in minutes.", avatar: "A" },
        { name: "Michael P.", text: "User-friendly interface and huge selection. I always book through this site now.", avatar: "M" },
        { name: "Elena K.", text: "Saved a lot of time and money thanks to this service. Highly recommend!", avatar: "E" }
    ];

    return (
        <Box>
            <HeroSection>
                <HeroContent>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Discover the World with Our Hotel Search Service
                    </Typography>
                    <Typography variant="h5">
                        Find your perfect stay anywhere, anytime
                    </Typography>
                </HeroContent>
            </HeroSection>

            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom>
                            About Our Service
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We offer an innovative approach to searching and booking hotels.
                            Our mission is to make travel accessible and comfortable for everyone.
                            With us, you'll find the perfect place to stay, whether it's a luxury resort or a cozy hostel.
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Our Advantages:
                        </Typography>
                        <List>
                            {advantages.map((advantage, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <CheckCircleOutlineIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={advantage} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            height="400"
                            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="Luxury hotel room"
                        />
                    </Grid>
                </Grid>

                <Box my={8}>
                    <Typography variant="h4" gutterBottom align="center">
                        What Our Customers Say
                    </Typography>
                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Box display="flex" alignItems="center" mb={2}>
                                            <Avatar>{testimonial.avatar}</Avatar>
                                            <Typography variant="h6" component="span" ml={2}>
                                                {testimonial.name}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            "{testimonial.text}"
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box my={8} textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        Ready to Start Your Journey?
                    </Typography>
                    <Typography variant="body1">
                        Join thousands of satisfied travelers and find your perfect hotel right now!
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default About;