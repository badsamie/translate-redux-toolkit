import { createSlice } from "@reduxjs/toolkit";
import {
  getCategories,
  getOneProduct,
  getProducts,
  getTotalPages,
} from "./productsActions";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    oneProduct: null,
    currentPage: 1,
    totalPages: 1,
    currentCategory: "",
    search: "",
    category: [],
    image: [],
  },
  reducers: {
    clearOneProductState: (state) => {
      state.oneProduct = null;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload.page;
    },
    changeCategory: (state, action) => {
      if (action.payload.category === "all") {
        state.currentCategory = "";
      } else {
        state.currentCategory = action.payload.category;
      }
      state.currentPage = 1;
    },
    setSearchVal: (state, action) => {
      state.search = action.payload.search;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.oneProduct = action.payload;
      })
      .addCase(getOneProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(getTotalPages.fulfilled, (state, action) => {
        state.totalPages = action.payload;
      });
  },
});
export const {
  clearOneProductState,
  changePage,
  setSearchVal,
  changeCategory,
  setPriceRangeState,
  clearAllFilters,
  ratingAdd,
} = productSlice.actions;
export default productSlice.reducer;
