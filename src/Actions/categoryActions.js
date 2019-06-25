import Category from '../Api/Category';
import snackBarStatus from './snackbarActions';

export const ACTIONS = {
    GET_ALL: 'category/get_all',
    GET: 'category/get',
};

export const getAll = () => async dispatch => {
    try {
        const {
            data: { data },
            status
        } = await Category.getAll();
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
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};

export const create = body => async dispatch => {
    try {
        const {
            data,
            status
        } = await Category.create(body);
        let createProductResponse = [];
        if (status === 200 || status === 201) {
            createProductResponse = {
                data,
                status
            };
            snackBarStatus({
                payload: {
                    title: 'Product Created!',
                    type: 'success',
                    enable: true,
                },
            })(dispatch);
        }
        return createProductResponse;
    } catch (error) {
        snackBarStatus({
            payload: {
                title: error.message,
                type: 'error',
                enable: true,
            },
        })(dispatch);
        return error;
    }
};