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
    Grid,
    Paper,
  } from '@mui/material';

// project imports
import { useApi } from '../Context/ApiContext';
// third party
import Carousel from 'react-material-ui-carousel';



// Transition effect for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});


const SingleProduct = ({ open, handleClose }) => {

    const { singleProduct } = useApi();

 

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                transitionDuration={800}
            >
                <DialogTitle disableTypography>
                    <Typography variant="h5">{'Product Details'}</Typography>
                </DialogTitle>
                <DialogContent>
                    {singleProduct === null ? '' :
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 10,
                        }}>
                            <Paper style={{
                                   padding: 15,
                                   maxWidth: 800,
                            }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} style={{
                                          width: '100%',
                                          maxWidth: 400,
                                    }}>
                                        <Carousel>
                                            {singleProduct.images.map((image, index) => (
                                                <img key={index} src={image} alt={`Product Image ${index + 1}`} style={{width: '100%', height: 'auto', maxHeight: 500}} />
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