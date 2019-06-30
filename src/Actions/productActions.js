import Product from "../Api/Product";
import { ACTIONS as ACTIONS_FORM } from "./productFormActions";
import snackBarStatus from "./snackbarActions";

export const ACTIONS = {
  GET_ALL: "product/get_all",
  GET: "product/get",
  SET_INPUT_FIELD: "product/set_input_field",
  LOADING: "product/loading",
  SET_CATEGORY: "product/set_category",
};

export const getAll = () => async dispatch => {
  try {
    const {
      data: { data },
      status
    } = await Product.getAll();
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
    }
    return response;
  } catch (error) {
    snackBarStatus({
      payload: {
        title: error.message,
        type: "error",
        enable: true
      }
    })(dispatch);
    return error;
  }
};

export const search = (category, term) => async dispatch => {
  dispatch({ type: ACTIONS.LOADING, payload: true });
  try {
    const {
      data: { data },
      status
    } = await Product.search(category, term);
    let response = [];
    if (status === 200) {
      response = data;
      dispatch({
        type: ACTIONS.GET_ALL,
        payload: response
      });
      dispatch({ type: ACTIONS.LOADING, payload: false });
    }
    return response;
  } catch (error) {
    dispatch({ type: ACTIONS.LOADING, payload: false });
    snackBarStatus({
      payload: {
        title: error.message,
        type: "error",
        enable: true
      }
    })(dispatch);
    return error;
  }
};

export const create = body => async dispatch => {
  try {
    const { data, status } = await Product.create(body);
    let createProductResponse = [];
    if (status === 200 || status === 201) {
      createProductResponse = {
        data,
        status
      };
      snackBarStatus({
        payload: {
          title: "Product Created!",
          type: "success",
          enable: true
        }
      })(dispatch);
    }
    return createProductResponse;
  } catch (error) {
    snackBarStatus({
      payload: {
        title: error.message,
        type: "error",
        enable: true
      }
    })(dispatch);
    return error;
  }
};

export const get = (id, isEdit = false) => async dispatch => {
  try {
    const {
      data: { data },
      status
    } = await Product.get(id);
    let productResponse = [];
    if (status === 200) {
      productResponse = data;
      if (isEdit) data.photo = "";
      dispatch({
        type: ACTIONS_FORM.SET_EDIT,
        payload: data
      });
    }
    return productResponse;
  } catch (error) {
    snackBarStatus({
      payload: {
        title: error.message,
        type: "error",
        enable: true
      }
    })(dispatch);
    return error;
  }
};

export const update = body => async dispatch => {
  try {
    const { data, status } = await Product.update(body);
    let productResponse = [];
    if (status === 200) {
      productResponse = {
        data,
        status
      };
      snackBarStatus({
        payload: {
          title: "Product Updated!",
          type: "success",
          enable: true
        }
      })(dispatch);
    }
    return productResponse;
  } catch (error) {
    snackBarStatus({
      payload: {
        title: error.message,
        type: "error",
        enable: true
      }
    })(dispatch);
    return error;
  }
};

export const remove = id => async dispatch => {
  try {
    const { data, status } = await Product.remove(id);
    let productResponse = [];
    if (status === 200) {
      productResponse = {
        data,
        status
      };
      snackBarStatus({
        payload: {
          title: "Product Removed!",
          type: "success",
          enable: true
        }
      })(dispatch);
    }
    return productResponse;
  } catch (error) {
    snackBarStatus({
      payload: {
        title: error.message,
        type: "error",
        enable: true
      }
    })(dispatch);
    return error;
  }
};

export const changeFormValue = (change, form, field, value) => dispatch => {
  dispatch(change(form, field, value));
  return value;
};

export const setInputField = inputField => dispatch => {
  dispatch({ type: ACTIONS.SET_INPUT_FIELD, payload: inputField });
};

export const loading = value => ({ type: ACTIONS.LOADING, payload: value });

export const setCategory = value => ({ type: ACTIONS.SET_CATEGORY, payload: value });
