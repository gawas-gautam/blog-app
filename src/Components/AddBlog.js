import React, { Component } from "react";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";

class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      cateory: "",
      content: "",
      msg: "",
    };
    let error = "";
  }

  seterror = () => {
    this.setState({
      msg: "Fail to add please try again!!!",
    });
    console.log("current state", this.state);
  };

  submitData = async (formValues) => {
    let newEmployee = {
      title: formValues.title,
      category: formValues.blog_category,
      content: formValues.blog_content,
    };
    const response = await fetch("/users/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    });
    if (!response.ok) {
      this.seterror();
    }

    return response;
    //this.props.addEmployee(newEmployee);
    //this.props.history.push("/");
  };

  renderInput({ input, label, meta, data_testid }) {
    return (
      <div className="form-group row">
        <label className="col-sm-1">{label}</label>
        <div className="col-sm-7">
          <input
            {...input}
            data-testid={data_testid}
            className="form-control"
          />
          <div className="errtext">{meta.error}</div>
        </div>
      </div>
    );
  }
  renderTextArea({ input, label, meta, data_testid }) {
    return (
      <div className="form-group row">
        <label className="col-sm-1">{label}</label>
        <div className="col-sm-7">
          <textarea
            {...input}
            data-testid={data_testid}
            className="form-control"
          ></textarea>
          <div>{meta.error}</div>
        </div>
      </div>
    );
  }

  renderSelectBox({ input, label, meta, data_testid }) {
    return (
      <div className="form-group row">
        <label className="col-sm-1">{label}</label>
        <div className="col-sm-7">
          <select {...input} className="form-control" data-testid={data_testid}>
            <option defaultValue="0">Choose...</option>
            <option value="science">Science</option>
            <option value="programming">Programming</option>
            <option value="electrical">Electrical</option>
            <option value="research">Research</option>
          </select>
          <div>{meta.error}</div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="blogform">
        <div className="panel panel-default">
          <div className="panel-body">
            <div role="alert">{this.state.msg} </div>
            <form
              onSubmit={this.props.handleSubmit(this.submitData)}
              className="form"
              data-testid="addblog"
            >
              <Field
                name="title"
                component={this.renderInput}
                label="Title"
                data_testid="title"
              />
              <Field
                name="blog_category"
                component={this.renderSelectBox}
                label="Category"
                data_testid="blog_category"
              />
              <Field
                name="blog_content"
                component={this.renderTextArea}
                label="Content"
                data_testid="blog_content"
              />
              <button className="btn btn-primary" data_testid="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // employees: state.employeeData.employees,
  forms: state.form,
});

// connect(mapStateToProps, {
//   getEmployee,
//   addEmployee,
//   editEmployee,
// })(withRouter(UserForm));

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "please enter title";
  }

  if (!formValues.blog_content) {
    errors.blog_content = "please enter content for blog";
  }

  if (!formValues.blog_category) {
    errors.blog_category = "please select category";
  }

  return errors;
};

const afterSubmit = (result, dispatch) => {
  if (result.ok) {
    //alert("Added Succesfully");
    dispatch(reset("addblog"));
  } else {
    //this.state.msg = "Fail to add please try again!!!";
    //alert("Fail to add please try again!!!");
  }
};

AddBlog = connect(mapStateToProps, null)(AddBlog);

export default reduxForm({
  form: "addblog", // a unique name for this form
  validate: validate,
  onSubmitSuccess: afterSubmit,
})(AddBlog);
