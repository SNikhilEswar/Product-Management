import React, { useEffect, useState } from 'react';

// material-ui
import {
  Button,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Autocomplete,
  Backdrop, 
  CircularProgress
} from '@mui/material';

// project imports
import MainCard from "../../Customs/MainCard";
import { useApi } from '../Context/ApiContext';
import Navbar from '../Nav';

import SingleProduct from '../Reusable/SingleProduct';
import EditProduct from '../Reusable/EditProduct';
import DeleteProduct from '../Reusable/DeleteProduct';



// Render the component with Material-UI components
const Categories = () => {

  const { getAllCategories, categories, categoryList, handleCategory, getSingleProduct, loading } = useApi();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // Function to handle modal opening and closing
  const handleModal = (modalType, value) => {
    switch (modalType) {
      case 'open':
        setOpen(true);
        break;
      case 'openEdit':
        setOpenEdit(true);
        break;
      case 'openDelete':
        setOpenDelete(true);
        break;
      case 'close':
        setOpen(false);
        setOpenEdit(false);
        setOpenDelete(false);
        break;
      default:
        break;
    }

    // Fetch single product data when opening a modal
    if (modalType === 'open' || modalType === 'openEdit' || modalType === 'openDelete') {
      getSingleProduct(value);
    }
  };

  // Functions to handle modal closing for each type
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseDelete = () => setOpenDelete(false);

  useEffect(() => {
    getAllCategories();
  }, [])

  // Render the component with the Material-UI components
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <MainCard title="Categories" secondary={
          <Autocomplete
            id="combo-box-demo"
            options={categories}
            getOptionLabel={(option) => option}
            style={{ width: 300 }}
            onChange={(e, value) => handleCategory(value)}
            renderInput={(params) => <TextField {...params} label="Product Categories" variant="outlined" />}
          />
        }>
          <Backdrop style={{ zIndex: 1301, color: "#fff" }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {categoryList.length === 0 ? <h2 style={{ textAlign: 'center' }}>Please Select the products Categories to View Products</h2> :

            <Grid container spacing={3}>
              {categoryList.map((res, index) => (
                <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
                  <Card style={{ height: '100%' }}>
                    <CardActionArea onClick={() => handleModal('open', res.id)}>
                      <CardMedia
                        style={{ height: 200 }}
                        image={res.thumbnail}
                        title={res.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {res.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Price: <b>{`$ ${res.price}`}</b>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" noWrap>
                          {res.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary" onClick={() => handleModal('openEdit', res.id)}>
                        Edit
                      </Button>
                      <Button size="small" color="secondary" onClick={() => handleModal('openDelete', res.id)}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

          }
        </MainCard>
      </Container>
      <SingleProduct open={open} handleClose={handleClose} />
      <EditProduct openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
      <DeleteProduct openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
    </>
  );
};

export default Categories;
