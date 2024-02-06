import React, { useEffect } from 'react';

// material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
// third party
import { Formik } from "formik";
import * as Yup from "yup";

// project imports
import { useApi } from '../Context/ApiContext';


// Validation schema using Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  discountPercentage: Yup.number().min(0, 'Discount percentage must be at least 0').max(100, 'Discount percentage cannot be more than 100'),
  rating: Yup.number().required('rating is required').min(1, 'Rating must be at least 0').max(5, 'Rating cannot be more than 5'),
  stock: Yup.number().required('Stock is required').integer('Stock must be an integer').min(1, 'Stock must be at least 0'),
  brand: Yup.string().required('Brand is required'),
  category: Yup.string().required('Category is required'),
  thumbnail: Yup.string().url('Thumbnail must be a valid URL').required('Thumbnail is required'),
  images: Yup.array().of(
    Yup.string().url('Image must be a valid URL')
  ).min(1, 'At least one image URL is required'),
});


// Styles using Material-UI makeStyles
const useStyles = makeStyles((theme) => ({
  userAddDialog: {
    "&>div:nth-child(3)": {
      justifyContent: "center",
      "&>div": {
        margin: "0px",
        borderRadius: "0px",
        maxWidth: "600px",
        maxHeight: "90%",
      },
    },
  },
  spacing: {
    margin: '15px 0'
  }
}));

// Transition effect for the dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});
const EditProduct = ({ openEdit, handleCloseEdit }) => {

  const classes = useStyles();

  const { singleProduct, categories, setSingleProduct, getAllCategories, handleEditProduct } = useApi();

  const handleImageChange = (index, value, props) => {
    const updatedImages = [...props.values.images];
    updatedImages[index] = value;
    props.setFieldValue('images', updatedImages);
  };

  const handleAddImage = (props) => {
    props.setFieldValue('images', [...props.values.images, '']);
  };

  const closeHandler = () => {
    setSingleProduct(null);
    handleCloseEdit();
  };

  useEffect(() => {
    getAllCategories();
  }, [])


  return (
    <>
      {singleProduct === null ? <></> :
        <Dialog
          open={openEdit}
          TransitionComponent={Transition}
          className={classes.userAddDialog}
          transitionDuration={800}
        >
          <DialogTitle disableTypography>
            <Typography variant="h5">Edit Product</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ padding: 20 }}>
              <Formik
                initialValues={singleProduct === null ? '' : {
                  title: singleProduct.title,
                  description: singleProduct.description,
                  price: singleProduct.price,
                  discountPercentage: singleProduct.discountPercentage,
                  rating: singleProduct.rating,
                  stock: singleProduct.stock,
                  brand: singleProduct.brand,
                  category: singleProduct.category,
                  thumbnail: singleProduct.thumbnail,
                  images: singleProduct.images,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  if (values) {
                    handleEditProduct(singleProduct.id, values, handleCloseEdit)
                  }
                }}
              >
                {(props) => (
                  <form onSubmit={props.handleSubmit}>
                    <Grid item xs={12} className={classes.spacing}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            id="title"
                            variant="outlined"
                            name="title"
                            label="Title"
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.title}
                            error={props.touched.title && Boolean(props.errors.title)}
                            helperText={props.touched.title && props.errors.title}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id="brand"
                            variant="outlined"
                            name="brand"
                            label="Brand"
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.brand}
                            error={props.touched.brand && Boolean(props.errors.brand)}
                            helperText={props.touched.brand && props.errors.brand}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Autocomplete
                            options={categories.length > 0 ? categories : []}  // Replace 'categories' with your array of category options
                            getOptionLabel={(option) => option}
                            getOptionSelected={(option, value) => option === value}
                            value={props.values.category || null}
                            onChange={(event, value) => props.setFieldValue('category', value)}
                            onBlur={props.handleBlur}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Category"
                                variant="outlined"
                                error={props.touched.category && Boolean(props.errors.category)}
                                helperText={props.touched.category && props.errors.category}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="price"
                            variant="outlined"
                            name="price"
                            label="Price"
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.price}
                            error={props.touched.price && Boolean(props.errors.price)}
                            helperText={props.touched.price && props.errors.price}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="discountPercentage"
                            variant="outlined"
                            name="discountPercentage"
                            label="Discount %"
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.discountPercentage}
                            error={props.touched.discountPercentage && Boolean(props.errors.discountPercentage)}
                            helperText={props.touched.discountPercentage && props.errors.discountPercentage}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="stock"
                            variant="outlined"
                            name="stock"
                            label="Stock"
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.stock}
                            error={props.touched.stock && Boolean(props.errors.stock)}
                            helperText={props.touched.stock && props.errors.stock}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            id="rating"
                            variant="outlined"
                            name="rating"
                            label="Rating"
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.rating}
                            error={props.touched.rating && Boolean(props.errors.rating)}
                            helperText={props.touched.rating && props.errors.rating}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="description"
                            variant="outlined"
                            name="description"
                            label="Description"
                            multiline
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.description}
                            error={props.touched.description && Boolean(props.errors.description)}
                            helperText={props.touched.description && props.errors.description}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id="thumbnail"
                            variant="outlined"
                            name="thumbnail"
                            label="Thumbnail"
                            fullWidth
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.thumbnail}
                            error={props.touched.thumbnail && Boolean(props.errors.thumbnail)}
                            helperText={props.touched.thumbnail && props.errors.thumbnail}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <div>
                            {props.values.images.map((image, index) => (
                              <div key={index} style={{ marginBottom: 10 }}>
                                <TextField
                                  label={`Image URL ${index + 1}`}
                                  fullWidth
                                  name="images"
                                  value={image}
                                  onChange={(e) => handleImageChange(index, e.target.value, props)}
                                  onBlur={props.handleBlur}
                                  error={props.touched.images && Boolean(props.errors.images)}
                                  helperText={props.touched.images && props.errors.images}
                                />
                              </div>
                            ))}
                            {props.values.images.length > 0 ? null : "Please Click on Add image or else you can't Submit the Form"}
                          </div>
                          <Button variant="outlined" color="primary" onClick={() => handleAddImage(props)}>
                            Add Image
                          </Button>
                        </Grid>
                        <DialogActions sx={{ mt: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Submit
                          </Button>
                          <Button
                            variant="text"
                            onClick={closeHandler}
                            color="primary"
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
          </DialogContent>
        </Dialog>
      }


    </>
  )
}

export default EditProduct