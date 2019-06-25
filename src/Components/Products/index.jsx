import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { updateModal } from "../../Actions/modalActions";
import Item from "./Item";
import style from './style';
import ProductView from "../ProductView";
import { get, getAll } from '../../Actions/productActions';
import Product from "../../Containers/Product";

/**
 * Class to show Inbox Messages.
 */
class Products extends Component {
  componentWillMount() {
    this.props.getAll();
  }
  /**
   * Handle to active modal and show the selected email with redux.
   *
   * @param {object} email selected email
   */
  handleClick = product => {
    this.props.get(product.id);
    this.props.updateModal({ payload: { status: true, element: <ProductView /> } })
  };
  handleEdit = product => {
    this.props.get(product.id,true);
    this.props.updateModal({ payload: { status: true, title: 'Edit Product', element: <Product /> } })
  }
  render() {
    const { products, classes } = this.props;
    return (
      <Grid container spacing={0}>
          {
            products.map(product => <Item product={product} classes={classes} handleClick={this.handleClick} handleEdit={this.handleEdit} />)
          }
          
      </Grid>
    );
  }
}

const mS = ({ productReducer: { products } }) => ({ products });

const mD = {
  updateModal,
  get,
  getAll,
};

export default withStyles(style)(connect(
  mS,
  mD
)(Products));
