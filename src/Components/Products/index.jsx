import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { updateModal } from "../../Actions/modalActions";
import Item from "./Item";
import style from "./style";
import ProductView from "../ProductView";
import { get, getAll, setCategory, search } from "../../Actions/productActions";
import Product from "../../Containers/Product";
import Progress from "../Progress";

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
    this.props.updateModal({
      payload: { status: true, title: "Product", element: <ProductView /> }
    });
  };
  handleEdit = product => {
    this.props.get(product.id, true);
    this.props.updateModal({
      payload: { status: true, title: "Edit Product", element: <Product /> }
    });
  };

  handleChange = event => {
    this.props.setCategory(event.target.value);
    this.props.search(event.target.value, '');
  };

  render() {
    const { products, classes, isLoading, category } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid item xs={6} className={classes.ListTitle}>
            List of Products
          </Grid>
          <Grid item xs={6} className={classes.categories}>
            <FormControl className={classes.formControl}>
              <Select
                value={category}
                onChange={this.handleChange}
                displayEmpty
                name="category"
                className={classes.selectEmpty}
              >
                <MenuItem value="">
                  <em>Select Category</em>
                </MenuItem>
                <MenuItem value="shoes">Shoes</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={0} className={classes.productsContainer}>
          {isLoading ? (
            <Progress />
          ) : (
            products.map(product => (
              <Item
                product={product}
                classes={classes}
                handleClick={this.handleClick}
                handleEdit={this.handleEdit}
              />
            ))
          )}
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ productReducer: { products, isLoading, category } }) => ({
  products,
  isLoading,
  category
});

const mD = {
  updateModal,
  get,
  getAll,
  setCategory,
  search,
};

export default withStyles(style)(
  connect(
    mS,
    mD
  )(Products)
);
