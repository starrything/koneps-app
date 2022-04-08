import {Box, Grid, Paper, Typography} from "@mui/material";

interface BannerProps {
    banner: {
        image: string;
        imageText: string;
        title: string;
        description: string;
    };
}

const Banner = (props: BannerProps) =>{
    const { banner } = props;

    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${banner.image})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={banner.image} alt={banner.imageText} />}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 6 },
                            pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {banner.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {banner.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Banner;
