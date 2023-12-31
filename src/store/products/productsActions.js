import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCTS_API } from "../../helpers/consts";
import { toggleCart } from "../cart/cartSlice";
import { toggleFav } from "../favorite/favoriteslice";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { getState }) => {
    const { currentPage, search } = getState().products;
    const queryParams = [];
    if (currentPage) {
      queryParams.push(`page=${currentPage}`);
    }
    if (search) {
      queryParams.push(`search=${search}`);
    }
    const queryString =
      queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    const { data } = await axios.get(
      `${PRODUCTS_API}/api/v1/apartment${queryString}`
    );
    return data.results;
  }
);
export const getTotalPages = createAsyncThunk(
  "products/getTotalPages",
  async () => {
    let prikol;
    let totalPages = 1;

    while (true) {
      try {
        let { data } = await axios.get(
          `${PRODUCTS_API}/api/v1/apartment/?page=${totalPages}`
        );
        if (data.results) {
          prikol = data.results;
          totalPages++;
        } else {
          totalPages--;
          break;
        }
      } catch (err) {
        totalPages--;
        prikol = null;
        break;
      }
    }

    return totalPages;
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
const getToken = () => {
  return JSON.parse(localStorage.getItem("tokens"));
};

export const addRating = createAsyncThunk(
  "products/addRating",
  async ({ id, rating }, { dispatch }) => {
    try {
      const ratingData = new FormData();
      ratingData.append("rating", rating);
      const tokens = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      };

      await axios.post(
        `${PRODUCTS_API}/api/v1/apartment/${id}/rating/`,
        ratingData,
        config
      );
    } catch (err) {
      console.log(err, "не добавляет");
    }
    dispatch(getOneProduct({ id }));
  }
);
export const addLike = createAsyncThunk(
  "products/addRating",
  async ({ id, like_count }, { dispatch }) => {
    try {
      const ratingData = new FormData();
      ratingData.append("like_count", like_count);

      const tokens = getToken();
      // console.log(tokens);
      const config = {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      };

      await axios.post(
        `${PRODUCTS_API}/api/v1/apartment/${id}/like/`,
        ratingData,
        config
      );
    } catch (err) {
      console.log(err, "нет лайка");
    }
    dispatch(getOneProduct({ id }));
  }
);
export const createImage = createAsyncThunk(
  "products/createImage",
  async ({ product }, { dispatch }) => {
    try {
      const imgData = new FormData();
      imgData.append("post", product.id);
      console.log(product.image);
      imgData.append("image", product.image);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(
        `${PRODUCTS_API}/api/v1/apartment/image/`,
        imgData,
        config
      );
      dispatch(getProducts());
    } catch (error) {
      console.log(error, "soska");
    }
  }
);
export const createComment = createAsyncThunk(
  "products/createComment",
  async ({ product, comment }, { dispatch }) => {
    try {
      const comData = new FormData();
      comData.append("body", comment);
      comData.append("apartment", product.id);

      const tokens = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      };

      await axios.post(
        `${PRODUCTS_API}/api/v1/apartment/comments/`,
        comData,
        config
      );

      dispatch(getProducts());
    } catch (error) {
      console.log(error, "soska");
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async ({ id, oneProduct }, { dispatch }) => {
    await axios.delete(`${PRODUCTS_API}/api/v1/apartment/${id}/`).then(() => {
      dispatch(toggleCart(oneProduct));
      dispatch(toggleFav(oneProduct.id));
      dispatch(getProducts());
    });
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
export const getCategories = createAsyncThunk(
  "products/getCategories",
  async () => {
    const data = await axios.get(`${PRODUCTS_API}/api/v1/apartment/category/`);
    const uniqCategories = new Set(data.data.map((product) => product.name));
    const category = [];
    for (let i of uniqCategories) {
      category.push(i);
    }
    return category;
  }
);
