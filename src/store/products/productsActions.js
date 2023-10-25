import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_API } from "../../helpers/consts";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const { data } = await axios.get(`${PRODUCTS_API}/api/v1/apartment/`);
    return data.results;
  }
);
export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async ({ id }) => {
    const { data } = await axios.get(`${PRODUCTS_API}/api/v1/apartment/${id}/`);
    return data;
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",

  async ({ product }, { dispatch }) => {
    try {
      const productData = new FormData();
      productData.append("title", product.title);
      productData.append("location", product.location);
      productData.append("price", product.price);
      productData.append("price_dollar", product.price_dollar);
      productData.append("education", product.education);
      productData.append("description", product.description);
      productData.append("category", product.category);
      productData.append("count_views", product.count_views);
      await axios.post(`${PRODUCTS_API}/api/v1/apartment/`, productData);
      dispatch(getProducts());
    } catch (err) {
      console.log(err);
    }
  }
);
export const createImage = createAsyncThunk(
  "products/createImage",
  async ({ product }, { dispatch }) => {
    try {
      const imageData = new FormData();
      imageData.append("post", product.post);
      await axios.post(`${PRODUCTS_API}/api/v1/apartment/image/`, imageData);
      dispatch(getProducts());
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id }, { dispatch }) => {
    await axios.delete(`${PRODUCTS_API}/api/v1/apartment/${id}/`);
    dispatch(getProducts());
  }
);
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ product }, { dispatch }) => {
    await axios.patch(
      `${PRODUCTS_API}/api/v1/apartment/${product.id}/`,
      product
    );
    dispatch(getProducts());
  }
);
