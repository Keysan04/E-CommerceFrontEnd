import {
  fetchAUser,
  fetchCategories,
  fetchNewAccessJWT,
  fetchProducts,
} from "../../helpers/axiosHelper";
import { setAProduct, setCat, setProduct, setUser } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
  const resp = await fetchAUser();

  if (resp?.user) {
    //send user to redux

    dispatch(setUser(resp.user));
  }
};

export const getCategories = () => async (dispatch) => {
  const resp = await fetchCategories();

  if (resp?.data) {
    //send user to redux

    dispatch(setCat(resp.data));
  }
};
export const getProducts = () => async (dispatch) => {
  const resp = await fetchProducts();

  if (resp?.data) {
    //send user to redux

    dispatch(setProduct(resp.data));
  }
};

export const getAProduct = (_id) => async (dispatch) => {
  // debugger;
  const res = await fetchProducts(_id);
  if (res?.data) {
    dispatch(setAProduct(res.data));
  }
};

export const autoLogin = () => async (dispatch) => {
  //check if we have accessJWT, then fetch user

  const accessJWT = sessionStorage.getItem("accessJWT");

  if (accessJWT) {
    return dispatch(getUserProfile());
  }

  const refreshJWT = localStorage.getItem("refreshJWT");

  if (refreshJWT) {
    const token = await fetchNewAccessJWT();

    //get accessJWT

    if (token?.accessJWT) {
      sessionStorage.setItem("accessJWT", token?.accessJWT);

      dispatch(getUserProfile());
    }
  }
};
