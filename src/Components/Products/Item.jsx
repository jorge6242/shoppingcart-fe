import React from "react";
import Fab from "@material-ui/core/Fab";
import { Grid } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import Edit from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

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
        <Grid xs={12} className={classes.itemTitle}>
          {product.name}
        </Grid>
        <Grid xs={12} className={classes.price}>
          {product.price}$
        </Grid>
        <Grid xs={12} className={classes.price}> 
          <Chip color="secondary" label={product.category.name} className={classes.chip} />
        </Grid>
        <Grid xs={12}>
          <Fab
            color="primary"
            aria-label="Edit"
            className={classes.fab}
            onClick={() => handleEdit(product)}
          >
            <Edit />
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  </Grid>
);

export default Item;
