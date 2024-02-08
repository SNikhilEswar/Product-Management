
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
  Backdrop, 
  CircularProgress
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

// project imports
import Navbar from '../Nav';
import { useApi } from '../Context/ApiContext';
import SingleProduct from '../Reusable/SingleProduct';
import EditProduct from '../Reusable/EditProduct';
import DeleteProduct from '../Reusable/DeleteProduct';


// Render the component with Material-UI components
// Functional component Users
const Users = () => {


  // State variables for modal visibility
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



  // Destructure values from useApi hook
  const { products, handleChange, skip, count, searchQuery, setSearchQuery, getAllProducts, getSingleProduct, loading } = useApi();


  // Fetch products on component mount and when skip or searchQuery changes
  useEffect(() => {
    getAllProducts(skip);
  }, [skip, searchQuery]);

  // JSX structure for the Users component
  return (
    <>
      <Backdrop style={{ zIndex: 1301, color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Navbar component */}
      <Navbar />
      {/* Main content container */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
            <TextField
              id="outlined-basic"
              label="Search Products"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>
        {/* Pagination component */}
        {count !== null && (
          <Pagination
            style={{ display: 'flex', justifyContent: 'center' }}
            count={count.limit}
            page={skip}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        )}

        {/* Product grid */}
        <div style={{ margin: '20px 15px' }}>
          {products.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {products.map((res, index) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} xl={3} key={index}>
                    <Card style={{ height: '100%' }}>
                      <CardActionArea onClick={() => handleModal('open', res.id)}>
                        <CardMedia
                          style={{ height: 200 }}
                          image={res.thumbnail}
                          title={res.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="h6">
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
            </>
          ) :
            // No products message when there are no products
            <h3 style={{ textAlign: 'center' }}>The Product that you looking for will be added in Feature or By Clicking on Add Product you can add the product</h3>
          }
        </div>
        {/* Bottom pagination component */}
        {count !== null && (
          <Pagination
            style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}
            count={count.limit}
            page={skip}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            shape="rounded"
          />
        )}

      </Container>

      {/* Modal components for SingleProduct, EditProduct, and DeleteProduct */}
      <SingleProduct open={open} handleClose={handleClose} />
      <EditProduct openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
      <DeleteProduct openDelete={openDelete} handleCloseDelete={handleCloseDelete} />
    </>
  )
}

export default Users