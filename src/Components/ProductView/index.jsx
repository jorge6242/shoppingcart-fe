import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { clear } from "../../Actions/productFormActions";
import { create, getAll } from "../../Actions/cartActions";
import { updateModal } from '../../Actions/modalActions';
import "./index.sass";

/**
 * Class to show selected email.
 */
class EmailView extends Component {
  componentWillUnmount() {
    this.props.clear();
  }

  handleAddToCart = productId => {
    const data = {
      product_id: productId,
      status: 1,
    };
    this.props.create(data).then(res => {
      if (res.status === 200 || res.status === 201) {
        this.props.getAll();
        this.props.updateModal({
          payload: { status: false, element: <div /> }
        });
      }
    });
  };

  render() {
    const {
      productFormReducer: { name, price, description, photo, id }
    } = this.props;
    return (
      <Grid container spacing={0} className="product-view-container">
        <Grid item xs={6} className="product-view-container__image-container">
          <img src={photo} alt="Product detail" />
        </Grid>
        <Grid item xs={5} className="product-view-container__detail-container">
          <Grid container spacing={0}>
            <Grid item xs={12} className="product-view-container__detail">
              Product: {name}
            </Grid>
            <Grid item xs={12} className="product-view-container__detail">
              Description: {description}
            </Grid>
            <Grid item xs={12} className="product-view-container__detail">
              Price: {price}$
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleAddToCart(id)}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ productFormReducer }) => ({ productFormReducer });

const mD = {
  clear,
  create,
  getAll,
  updateModal,
};

export default connect(
  mS,
  mD
)(EmailView);
