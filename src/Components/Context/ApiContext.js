import { createContext, useContext, useEffect, useState } from 'react';

// project imports
import { APIURL } from '../../constant';

// third party
import axios from 'axios';
import { toast } from 'react-toastify';

// Create a context to manage API-related state and functions
const ApiContext = createContext();

// Toast success handler
const handleSuccess = (value) => {
  toast.success(value);
};

const handleError = (value) => {
  // Assuming you have the ID from the POST API response
  toast.error(value ? value : "Something Went Wrong");
};

// Context provider component for managing API-related state
export const ApiProvider = ({ children }) => {

  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [count, setCount] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryList, setCatecoryList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(1);
  const [loading, setLoading] = useState(true);

  
  // handling pagination
  const handleChange = (event, value) => {
    setSkip(value);
  };

    // handle for getting products based on id
    const handleCategory = (value) => {
      if (value === null) {
        setCatecoryList([]);
      } else getCategoryList(value);
    }


  // Handles the login for User to login
  const handleUserLogin = async (account, setAccount, navigate) => {
    try {
      const response = await axios.post(`${APIURL}/auth/login`, account, {
        headers: { 'Content-Type': 'application/json' },
      });
      const token = response.data.token;
      // Store the token in the session
      sessionStorage.setItem('token', token);

      // Reset the input fields
      setAccount({ username: "", password: "" });
      handleSuccess(`Welcome ${response.data.firstName} you logged in`);
      // Redirect to the products page
      navigate("/products");
      // return token;
    } catch (error) {
      const err = error.message === "Network Error" ? error.message : error.response.data.message
      handleError(err);
    }
  };


  const getUserData = async (tokens) => {
    try {
      const response = await axios.get(`${APIURL}/auth/me`, {
        headers: {
          'Authorization': tokens,
        }
      });

      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      if (error && error.response && error.response.status === 401) {
        // If unauthorized, remove token and reload the page
        handleError("Token Expired Please login Again");
        sessionStorage.removeItem('token');
        window.location.reload();
      } else {
        handleError(error.message);
      }
    }
  }



  // handling get all products or search based on condition
  const getAllProducts = async (skip) => {
    try {
      if (searchQuery.trim() !== '') {
        const response = await axios.get(`${APIURL}/products/search?q=${searchQuery}`, {
          headers: {
            'Authorization': token,
          }
        });

        if (response.data) {
          setProducts(response.data.products);
          setCount(null);
          setSkip(1);
        }
      } else {
        setLoading(true);
        const response = await axios.get(`${APIURL}/products?limit=10&skip=${skip === 1 ? 0 : (skip - 1) * 10}&select=title,price,description,thumbnail`, {
          headers: {
            'Authorization': token,
          }
        });

        if (response.data) {
          setProducts(response.data.products);
          setCount(response.data);
          setLoading(false);
        }
      }
    } catch (error) {
      const err = error.message === "Network Error" ? error.message : error.response.data.message
      handleError(err);
      setLoading(false);
      //throw error;
    }
    setCatecoryList([]);
  }

  // handling get single product details based on id
  const getSingleProduct = async (id) => {
    try {
      const response = await axios.get(`${APIURL}/products/${id}`, {
        headers: {
          'Authorization': token,
        }
      });

      if (response.data) {
        setSingleProduct(response.data);
      }
    } catch (error) {
      if (error && error.response.status === 401) {
        handleError(error.response.data.message);
      } else {
        handleError(error);
      }
      // throw error;
    }
  }


  // handle for getting all the categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${APIURL}/products/categories`, {
        headers: {
          'Authorization': token,
        }
      });

      if (response.data) {
        setCategories(response.data);
        setCatecoryList([]);
        setSkip(1);
      }
    } catch (error) {
      setCategories([]);
      // throw error;
      const err = error.message === "Network Error" ? error.message : error.response.data.message
      handleError(err);
    }
  }




  // handling for getting products
  const getCategoryList = async (categoryVal) => {
    setLoading(true);
    try {
      const response = await axios.get(`${APIURL}/products/category/${categoryVal}`, {
        headers: {
          'Authorization': token,
        }
      });

      if (response.data) {
        setCatecoryList(response.data.products);
        setLoading(false);
      }
    } catch (error) {
      setCatecoryList([]);
      const err = error.message === "Network Error" ? error.message : error.response.data.message
      handleError(err);
      setLoading(false);
      //throw error;
    }
  }

  // handled for creating new product
  const handleCreateProduct = async (formData, handleNavigate) => {
    try {
      const response = await axios.post(`${APIURL}/products/add`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        handleSuccess(`Product Created Successfully ID ${response.data.id}`);
        handleNavigate();
        setSkip(1);
        getAllProducts(skip);
      }
    } catch (error) {
      const err = error.message === "Network Error" ? error.message : error.response.data.message
      handleError(err);
    }
  };

  // handled  to modify existing product 
  const handleEditProduct = async (id, formData, handleCloseEdit) => {
    try {
      const response = await axios.put(`${APIURL}/products/${id}`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        handleSuccess(`Product Edited Successfully ID ${response.data.id}`);
        setSingleProduct(null);
        handleCloseEdit();
        getAllProducts(skip);
      }
    } catch (error) {
      const err = error.message === "Network Error" ? error.message : error.response.data.message
      handleError(err);
    }
  };

  // handle to delete the product
  const handleDeleteProduct = async (id, handleCloseDelete) => {
    try {
      const response = await axios.delete(`${APIURL}/products/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data) {
        handleSuccess(`Product Deleted Successfully ID ${response.data.id}`);
        handleCloseDelete();
        getAllProducts(skip);
      }
    } catch (error) {
      const err = error.message === "Network Error" ? error.message : error.response.data.message;
      handleError(err);
    }
  }


  useEffect(() => {
    if (token) {
      getUserData(token);
    }
  }, [token]);


  return (
    <ApiContext.Provider
      value={{
        products,
        skip,
        count,
        searchQuery,
        singleProduct,
        categories,
        categoryList,
        loading,
        handleUserLogin,
        handleChange,
        setSearchQuery,
        getAllProducts,
        getSingleProduct,
        getAllCategories,
        handleCreateProduct,
        setSingleProduct,
        handleEditProduct,
        handleDeleteProduct,
        handleCategory,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};