import { Link as RouterLink } from "react-router-dom";

import {Container, Grid, Link, Stack, Typography} from "@mui/material";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <RouterLink to="/">
                Jonghyun, Inc.
            </RouterLink>{' '}
            {new Date().getFullYear()} ·
        </Typography>
    );
}

const Footer = (props: any) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    return (
        <Container
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6]
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Stack direction="row" spacing={1}>
                        <Copyright/>
                        <Link display="block" variant="body1" component={RouterLink} to={"#"}>
                            Privacy
                        </Link>
                        <Link display="block" variant="body1" component={RouterLink} to={"#"}>
                            Terms
                        </Link>
                    </Stack>
                </Grid>
                <Grid item xs={2}>
                    <Link display="block" variant="body1" onClick={scrollToTop}>Back to top</Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;