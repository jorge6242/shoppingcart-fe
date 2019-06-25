import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { change } from "redux-form";
import ProductForm from "../../Components/ProductForm";
import {
  create,
  getAll,
  changeFormValue,
  setInputField,
  update,
} from "../../Actions/productActions";
import { clear } from '../../Actions/productFormActions';
import { getAll as getCategorys } from "../../Actions/categoryActions";
import snackBarStatus from "../../Actions/snackbarActions";
import { updateModal } from "../../Actions/modalActions";
import "./index.sass";

class Product extends Component {
  componentDidMount() {
    this.props.getCategorys();
      this.props.changeFormValue(
        change,
        "ProductForm",
        "photo",
        "",
      );
  }
  componentWillUnmount() {
    this.props.clear();
  }
  handleForm = form => {
    if (form.id === "") {
      this.props.create(form).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.updateModal({
            payload: { status: false, element: <div /> }
          });
        }
      });
    } else {
      this.props.update(form).then(res => {
        if (res.status === 200 || res.status === 201) {
          this.props.getAll();
          this.props.updateModal({
            payload: { status: false, element: <div /> }
          });
        }
      });
    }
  };

  triggerClick = input => {
    if (input) {
      this.props.setInputField(input);
    }
  };

  handleImage = () => {
    const { inputField } = this.props;
    inputField.click();
  }

  loadImage = evt => {
    const input = evt.target;
    if (input && input.files && input.files.length) {
      // used to verify img dimensions
      const img = new window.Image();
      img.src = window.URL.createObjectURL(input.files[0]);

      const reader = new window.FileReader();
      reader.onload = () => {
        this.setState({
          name: input.files[0].name,
          image: reader.result,
          loadedImage: "is-loaded",
          statusButtom: false
        });
        this.props.changeFormValue(
          change,
          "ProductForm",
          "photo",
          reader.result
        );
      };
      img.onload = () => {
        if (img.naturalHeight <= 5000 && img.naturalWidth <= 5000) {
          reader.readAsDataURL(input.files[0]);
        } else {
          this.props.snackBarStatus({
            payload: {
              enable: true,
              title: "Ups! the image size is to big.",
              type: "error"
            }
          });
        }
      };
    }
  };

  render() {
    const { categorys } = this.props;
    return (
      <Grid container spacing={0} className="sprint-container">
        <Grid item xs={12} className="sprint-container__form">
          <ProductForm
            handleForm={this.handleForm}
            categorys={categorys}
            triggerClick={this.triggerClick}
            loadImage={this.loadImage}
            handleImage={this.handleImage}
          />
        </Grid>
      </Grid>
    );
  }
}

const mS = ({
  categoryReducer: { categorys },
  productReducer: { inputField },
  productFormReducer,
}) => ({ categorys, inputField, productFormReducer });

const mD = {
  create,
  getAll,
  updateModal,
  getCategorys,
  snackBarStatus,
  changeFormValue,
  setInputField,
  update,
  clear,
};

export default withRouter(
  connect(
    mS,
    mD
  )(Product)
);
