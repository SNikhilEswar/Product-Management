import React from "react";
// material-ui

import {
    Button,
    CardContent,
    CardActions,
    Divider,
    Grid,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// project imports
import MainCard from "../../Customs/MainCard";
import { useApi } from '../Context/ApiContext';




// Render the component with Material-UI components
const DeleteProduct = ({ openDelete, handleCloseDelete }) => {
    
    const { handleDeleteProduct, singleProduct } = useApi();


    return (
        <>
            {singleProduct === null ? <></> :
                <Modal
                    open={openDelete}
                    aria-labelledby="server-modal-title"
                    aria-describedby="server-modal-description"
                    style={{
                        display: "flex",
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <MainCard
                        style={{
                            width: 500,
                            zIndex: 1,
                        }}
                        title="Delete User"
                        content={false}
                        secondary={
                            <IconButton onClick={() => { handleCloseDelete(); }}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    >
                        <CardContent>
                            <Typography variant="body1">
                                Are you sure you want to Delete <b>{singleProduct ? singleProduct.title : ''}</b>{" "} ?
                            </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid container justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    onClick={() => handleDeleteProduct(singleProduct.id, handleCloseDelete)}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </CardActions>
                    </MainCard>
                </Modal>
            }
        </>
    )
}


export default DeleteProduct;