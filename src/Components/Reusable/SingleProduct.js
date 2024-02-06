import React from 'react';

// material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Typography,
    Grid, Paper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// project imports
import { useApi } from '../Context/ApiContext';
// third party
import Carousel from 'react-material-ui-carousel';

// Styles using Material-UI makeStyles
const useStyles = makeStyles((theme) => ({
    userAddDialog: {
        "&>div:nth-child(3)": {
            justifyContent: "center",
            "&>div": {
                margin: "0px",
                borderRadius: "0px",
                maxWidth: "800px",
                maxHeight: "90%",
            },
        },
    },
    spacing: {
        margin: '15px 0'
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        maxWidth: 800,
    },
    carouselContainer: {
        width: '100%',
        maxWidth: 400,
    },
    carouselImage: {
        width: '100%',
        height: 'auto', // Ensure the height is adjusted proportionally
        maxHeight: 300, // Set a fixed max height for the images
    },
}));

// Transition effect for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});


const SingleProduct = ({ open, handleClose }) => {
    const classes = useStyles();
    const { singleProduct } = useApi();

    // Slick settings for the carousel

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                className={classes.userAddDialog}
                transitionDuration={800}
            >
                <DialogTitle disableTypography>
                    <Typography variant="h5">{'Product Details'}</Typography>
                </DialogTitle>
                <DialogContent>
                    {singleProduct === null ? '' :
                        <div className={classes.root}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} className={classes.carouselContainer}>
                                        <Carousel>
                                            {singleProduct.images.map((image, index) => (
                                                <img key={index} src={image} alt={`Product Image ${index + 1}`} className={classes.carouselImage} />
                                            ))}
                                        </Carousel>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="h5" gutterBottom>
                                            {singleProduct.title}
                                        </Typography>
                                        <Typography variant="body1" color="textSecondary" paragraph>
                                            {singleProduct.description}
                                        </Typography>
                                        <Typography variant="h6">
                                            Price: ${singleProduct.price.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Discount: {singleProduct.discountPercentage}% off
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Rating: {singleProduct.rating}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Stock: {singleProduct.stock} units available
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Brand: {singleProduct.brand}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" paragraph>
                                            Category: {singleProduct.category}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    }
                </DialogContent>
                <DialogActions sx={{ mt: 2 }}>
                    <Button
                        variant="text"
                        onClick={handleClose}
                        color="primary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SingleProduct