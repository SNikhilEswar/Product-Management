import React from "react";
// material-ui
import { CssBaseline } from '@mui/material';


// third party
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, } from 'react-toastify';

// project imports
import Login from "./Components/Auth/Login";
import { ApiProvider } from './Components/Context/ApiContext';
import Protected from './ProctedRoutes/Protected'
import AddUser from "./Components/AddProduct";
import Categories from "./Components/Categories";
import Products from "./Components/Products";


function App() {
  return (
    <>
      {/* Apply global CSS baseline */}
      <CssBaseline />
      {/* Provide API context to components using the ApiProvider */}
      <ApiProvider>
        {/* Set up routing using BrowserRouter */}
        <Router>
          <Routes>
            <Route
              path="/products"
              element={<Protected><Products /></Protected>} />
            <Route
              path="/add-product"
              element={<Protected> <AddUser /></Protected>} />
            <Route
              path="/categories"
              element={<Protected> <Categories /></Protected>} />
            <Route
              path="/"
              element={<Login />}
            />
            <Route path="*" element={<Navigate to="/products" />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </ApiProvider>
      {/* Display Toast notifications */}
      <ToastContainer />
    </>
  );
}

export default App;
