import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ListIcon from "@material-ui/icons/List";
import FaceIcon from "@material-ui/icons/Face";
import SearchIcon from "@material-ui/icons/Search";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { logout } from "../../Actions/loginActions";
import styles from "./style";
import { updateModal } from "../../Actions/modalActions";
import { search } from "../../Actions/productActions";
import Product from "../Product";
import handleDebounce from "../../helpers/handleDebounce";
import Main from "../../Components/Main";

/**
 * Class to show the main app.
 */
class Dashboard extends React.Component {
  state = {
    mobileOpen: false
  };

  /**
   * Handle to show/hide the drawer
   */
  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleClick = () => {
    this.props.updateModal({
      payload: { status: true, title: "Create Product", element: <Product /> }
    });
  };

  handleSearch = event => {
    const { category } = this.props;
    this.props.search(category, event.value);
  };

  render() {
    const { classes, theme, history, myCart } = this.props;
    const cart = myCart.filter(cart => cart.status === 1);
    const drawer = (
      <div>
        <div className={classes.toolbar}>
          <Grid container spacing={0} className={classes.account}>
            <Grid item xs={12}>
              <Avatar className={classes.avatar}>
                <FaceIcon className={classes.icon} />
              </Avatar>
            </Grid>
            <Grid item xs={12} className={classes.customSelect}>
              <FormControl className={classes.formControl}>
                <Select value={1}>
                  <MenuItem value={1}>usertest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push("/dashboard/products")}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary={"Products"} />
          </ListItem>
          <ListItem button onClick={() => history.push("/dashboard/cart")}>
            <ListItemIcon>
              <Badge badgeContent={cart.length} invisible={cart.length > 0 ? false : true} color="primary">
                <ShoppingCart />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={"Shopping Cart"} />
          </ListItem>
          <ListItem
            button
            onClick={() => history.push("/dashboard/my-shopping")}
          >
            <ListItemIcon>
              <ShoppingBasket />
            </ListItemIcon>
            <ListItemText primary={"My shoppings"} />
          </ListItem>
          <ListItem button onClick={() => this.props.logout()}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar color="default" position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <SearchIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="input-with-icon-grid"
                      label="Search"
                      onChange={handleDebounce(this.handleSearch, 3000)}
                    />
                  </Grid>
                </Grid>
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children ? this.props.children : <Main />}
        </main>
        <div className={classes.addButton}>
          <Fab color="primary" aria-label="Add" onClick={this.handleClick}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  /** Object styles of material UI */
  classes: PropTypes.object.isRequired,
  /** Defining container grid in material UI */
  container: PropTypes.object,
  /** Defining theme tools in material UI */
  theme: PropTypes.object.isRequired
};

const mS = ({ productReducer: { category }, cartReducer: { myCart } }) => ({ category, myCart });

const mD = {
  logout,
  updateModal,
  search
};

export default withRouter(
  connect(
    mS,
    mD
  )(withStyles(styles, { withTheme: true })(Dashboard))
);
