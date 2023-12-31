import axios from "axios";
import { ACCOUNT_API } from "./consts";

let updateFunc; // Declare updateFunc outside the function

export const addDataToLocalStorage = (user, tokens) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

export const updateToken = () => {
  let updateFunc = setInterval(async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    if (!tokens) return clearInterval(updateFunc);
    const Authorization = `Bearer ${tokens.access}`;
    const { data } = await axios.post(
      `${ACCOUNT_API}/account/refresh/`,
      { refresh: tokens.refresh },
      { headers: { Authorization } }
    );
    localStorage.setItem(
      "tokens",
      JSON.stringify({ refresh: tokens.refresh, access: data.access })
    );
  }, 1000 * 60 * 9);
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("tokens");
};

export const isUserLogin = () => {
  const user = localStorage.getItem("user");
  if (!user) return false;
  return true;
};


export const getAuthConfig = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  if (!tokens) return false;
  const Authorization = `Bearer ${tokens.access}`;
  const config = {
      headers: {
          Authorization,
      },
  };
  return config;
};


export const getProductRating = (productObj) => {
  const rating =
    productObj.comments.reduce((acc, commentObj) => {
      return acc + commentObj.rating;
    }, 0) / productObj.comments.length;
  return rating.toFixed(1);
};
