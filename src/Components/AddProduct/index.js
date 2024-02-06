import React, { useEffect } from 'react';

// material-ui
import {
    Button,
    Grid,
    TextField,
    Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';


// third party
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';

// project imports
import { useApi } from '../Context/ApiContext';
import Navbar from '../Nav';
import MainCard from "../../Customs/MainCard";

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
    spacing: {
        margin: '15px 0'
    }
}));

// Functional component for adding
const AddUser = () => {

    const classes = useStyles();

    const { getAllCategories, categories, handleCreateProduct } = useApi();

    const navigate = useNavigate();

    const handleNavigate = () => {
        // Use navigate to products page
        navigate('/products');
    };



    const initialValues = {
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
    };

    const onSubmit = (values) => {
        const areAllImagesFilled = values.images.every((image) => !!image);

        if (!areAllImagesFilled) {
            formik.setErrors({ images: 'Please fill out all image URLs' });
        } else if (values.images.length === 0) {
            formik.setErrors({ images: 'At least one image URL is required' });
        } else {
            // Handle form submission logic here
            console.log(values);
            handleCreateProduct(values, handleNavigate)
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const handleImageChange = (index, value) => {
        const updatedImages = [...formik.values.images];
        updatedImages[index] = value;
        formik.setFieldValue('images', updatedImages);
    };

    const handleAddImage = () => {
        formik.setFieldValue('images', [...formik.values.images, '']);
    };



    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            {/* Navbar component */}
            <Navbar />
            {/* Main content container */}
            <Container maxWidth="lg" className={classes.container}>
                <MainCard title="Add Product">
                    <Grid container spacing={2} style={{ padding: 20 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item xs={12} className={classes.spacing}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <TextField
                                            id="title"
                                            variant="outlined"
                                            name="title"
                                            label="Title"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.title}
                                            error={formik.touched.title && Boolean(formik.errors.title)}
                                            helperText={formik.touched.title && formik.errors.title}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                                        <TextField
                                            id="brand"
                                            variant="outlined"
                                            name="brand"
                                            label="Brand"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.brand}
                                            error={formik.touched.brand && Boolean(formik.errors.brand)}
                                            helperText={formik.touched.brand && formik.errors.brand}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
                                        <Autocomplete
                                            options={categories.length > 0 ? categories : []}  // Replace 'categories' with your array of category options
                                            getOptionLabel={(option) => option}
                                            getOptionSelected={(option, value) => option === value}
                                            // value={formik.values.category}
                                            value={formik.values.category || null}
                                            onChange={(event, value) => formik.setFieldValue('category', value)}
                                            onBlur={formik.handleBlur}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Category"
                                                    variant="outlined"
                                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                                    helperText={formik.touched.category && formik.errors.category}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <TextField
                                            id="price"
                                            variant="outlined"
                                            name="price"
                                            label="Price"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.price}
                                            error={formik.touched.price && Boolean(formik.errors.price)}
                                            helperText={formik.touched.price && formik.errors.price}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <TextField
                                            id="discountPercentage"
                                            variant="outlined"
                                            name="discountPercentage"
                                            label="Discount %"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.discountPercentage}
                                            error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                                            helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <TextField
                                            id="stock"
                                            variant="outlined"
                                            name="stock"
                                            label="Stock"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.stock}
                                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                                            helperText={formik.touched.stock && formik.errors.stock}
                                        />
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                                        <TextField
                                            id="rating"
                                            variant="outlined"
                                            name="rating"
                                            label="Rating"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.rating}
                                            error={formik.touched.rating && Boolean(formik.errors.rating)}
                                            helperText={formik.touched.rating && formik.errors.rating}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <TextField
                                            id="description"
                                            variant="outlined"
                                            name="description"
                                            label="Description"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.description}
                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                            helperText={formik.touched.description && formik.errors.description}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                        <TextField
                                            id="thumbnail"
                                            variant="outlined"
                                            name="thumbnail"
                                            label="Thumbnail"
                                            fullWidth
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.thumbnail}
                                            error={formik.touched.thumbnail && Boolean(formik.errors.thumbnail)}
                                            helperText={formik.touched.thumbnail && formik.errors.thumbnail}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <div>
                                            {formik.values.images.map((image, index) => (
                                                <div key={index} style={{ marginBottom: 10 }}>
                                                    <TextField
                                                        label={`Image URL ${index + 1}`}
                                                        fullWidth
                                                        name="images"
                                                        value={image}
                                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.images && Boolean(formik.errors.images)}
                                                        helperText={formik.touched.images && formik.errors.images}
                                                    />
                                                </div>
                                            ))}
                                            {formik.values.images.length > 0 ? null : "Please Click on Add image or else you can't Submit the Form"}
                                        </div>
                                        <Button variant="outlined" color="primary" onClick={handleAddImage}>
                                            Add Image
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" color="primary">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </MainCard>
            </Container>
        </>
    )
}
export default AddUser;