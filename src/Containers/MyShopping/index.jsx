import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAll } from "../../Actions/cartActions";
import { updateModal } from '../../Actions/modalActions';
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
    textAlign: 'right',
    marginTop: 20,
  }
});

class MyShopping extends Component {
  componentWillMount() {
    this.props.getAll();
  }
  render() {
    const { classes, myCart } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>My Shopping</Grid>
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
                {myCart.map(row => row.status === 2 && (
                  <TableRow key={row.product.id}>
                    <TableCell> {row.product.name} </TableCell>
                    <TableCell> {row.product.description} </TableCell>
                    <TableCell> $ {row.product.price} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mS = ({ cartReducer: { myCart } }) => ({ myCart });

const mD = {
  getAll,
  updateModal,
};

export default connect(
  mS,
  mD
)(withStyles(styles)(MyShopping));
