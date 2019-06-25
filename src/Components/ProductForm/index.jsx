import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%"
  }
});

const validate = values => {
  const errors = {};
  const requiredFields = ["name", "description", "price", "categories_id"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const renderTextField = ({
  input,
  label,
  readOnly,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    label={label}
    error={touched && error}
    InputProps={{
      readOnly,
    }}
    {...input}
    {...custom}
  />
);

const renderSelectField = ({
  customSelect,
  input,
  label,
  meta: { touched, error },
  children,
  classes,
  ...custom
}) => (
  <FormControl className={classes.formControl} error={touched && error}>
    <InputLabel htmlFor="age-native-simple" className="title-type">
      Type
    </InputLabel>
    <Select
      className="select-underline"
      {...input}
      {...custom}
      inputProps={{
        name: "age",
        id: "age-native-simple"
      }}
    >
      {children}
    </Select>
  </FormControl>
);

const ProductForm = props => {
  const {
    handleSubmit,
    pristine,
    reset,
    submitting,
    handleForm,
    categorys,
    classes,
    triggerClick,
    loadImage,
    handleImage,
    productFormReducer,
  } = props;
  console.log('productFormReducer ', productFormReducer);
  return (
    <Grid container spacing={0} className="login-form">
      <form onSubmit={handleSubmit(handleForm)}>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="name"
            type="text"
            component={renderTextField}
            label="Product"
          />
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="description"
            type="text"
            component={renderTextField}
            label="Description"
          />
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="price"
            type="text"
            component={renderTextField}
            label="Price"
          />
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="photo"
            type="text"
            component={renderTextField}
            label="Image"
            readOnly
          />
          <Button variant="contained" color="primary" onClick={handleImage}>
            Select image
          </Button>
          <input
            style={{ display: "none" }}
            type="file"
            id="load_image"
            accept="image/*"
            ref={triggerClick}
            onChange={loadImage}
          />
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Field
            name="categories_id"
            component={renderSelectField}
            label="Project"
            inputProps={{
              name: "categories_id",
              id: "categories_id"
            }}
            classes={classes}
          >
            {categorys.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Field>
        </Grid>
        <Grid item xs={12} className="login-form__field">
          <Button
            type="submit"
            disabled={submitting}
            variant="contained"
            color="primary"
          >
            {productFormReducer.id === '' ? 'Create' : 'Update'}
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            variant="contained"
            color="secondary"
            onClick={reset}
          >
            Limpiar
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

const mS = state => ({
  initialValues: state.productFormReducer,
  productFormReducer: state.productFormReducer,
});

const CustomProductForm = reduxForm({
  form: "ProductForm",
  validate,
  enableReinitialize: true
})(ProductForm);

export default withStyles(styles)(connect(mS)(CustomProductForm));
