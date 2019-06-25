import React from "react";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const Item = ({ product, classes, handleClick, handleEdit }) => (
  <Grid xs={2} className={classes.itemContainer}>
    <Paper>
      <Grid container spacing={0}>
        <Grid
          xs={12}
          className={classes.avatarContainer}
          onClick={() => handleClick(product)}
        >
          <Avatar
            alt="Remy Sharp"
            src={product.photo}
            className={classes.avatar}
          />
        </Grid>
        <Grid xs={12}>{product.name}</Grid>
        <Grid xs={12}>{product.price}$</Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(product)}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
);

export default Item;
