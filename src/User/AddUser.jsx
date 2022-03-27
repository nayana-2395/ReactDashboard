import React from "react";
import { Row, Col } from "react-bootstrap";
import { Formik, Field } from "formik";

function AddUser(props) {
  const formRequest = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
  };

  return (
    <Formik
      initialValues={formRequest}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.first_name) {
          errors.first_name = "Required";
        }
        if (!values.last_name) {
          errors.last_name = "Required";
        }
        if (!values.gender) {
          errors.gender = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        props.addUser(values);
        setSubmitting(false);
        resetForm();
        // setTimeout(() => {
        //   console.log(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} id="add-user">
          <Row className="pb-3">
            <Col lg={12} className="pb-3">
              <label className="heading-h1">Add New Candidate</label>
            </Col>
            <Col lg={6}>
              <input
                className="input"
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              <div className="error">
                {errors.first_name && touched.first_name && errors.first_name}
              </div>
            </Col>
            <Col lg={6}>
              <input
                className="input"
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              <div className="error">
                {errors.last_name && touched.last_name && errors.last_name}
              </div>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col lg={12}>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="error">
                {errors.email && touched.email && errors.email}
              </div>
            </Col>
          </Row>
          <Row className="pb-3">
            <Col lg={6}>
              <div role="group" aria-labelledby="my-radio-group">
                <label className="label-btn">
                  <Field type="radio" name="gender" value="Female" />
                  Female
                </label>
                <label className="label-btn">
                  <Field type="radio" name="gender" value="Male" />
                  Male
                </label>
              </div>
              <div className="error">
                {errors.gender && touched.gender && errors.gender}
              </div>
            </Col>
            <Col lg={6}>
              <button
                className="default-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
}

export { AddUser };
