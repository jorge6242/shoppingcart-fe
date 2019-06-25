import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { getAll, purchase } from "../../Actions/cartActions";
import { updateModal } from "../../Actions/modalActions";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  checkoutContainer: {
    textAlign: "right",
    marginTop: 20
  }
});

class Cart extends Component {
  componentWillMount() {
    this.props.getAll();
  }
  handlePurchase = () => {
    this.props.purchase().then(res => {
      if (res.status === 200 || res.status === 201) {
        this.props.getAll();
        this.props.updateModal({
          payload: { status: false, element: <div /> }
        });
      }
    });
  };
  render() {
    const { classes, myCart } = this.props;
    let total =
      myCart.length > 0
        ? _.sumBy(
            myCart,
            element => element.status === 1 && Math.round(element.product.price)
          )
        : 0;
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          Purchase
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myCart.map(
                  row =>
                    row.status === 1 && (
                      <TableRow key={row.product.id}>
                        <TableCell> {row.product.name} </TableCell>
                        <TableCell> {row.product.description} </TableCell>
                        <TableCell> $ {row.product.price} </TableCell>
                      </TableRow>
                    )
                )}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell />
                  <TableCell>${total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.checkoutContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handlePurchase()}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ cartReducer: { myCart } }) => ({ myCart });

const mD = {
  getAll,
  purchase,
  updateModal
};

export default connect(
  mS,
  mD
)(withStyles(styles)(Cart));
