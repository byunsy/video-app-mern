// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../../../_actions/user_action";
// import { withRouter, Link } from "react-router-dom";
// import { Row, Form, Input, Button, Checkbox, message } from "antd";

// // ============================================================================
// // Error Message for Email/Password validation process.

// const onSubmitErrorHandler = (error_message) => {
//   message.error({
//     content: error_message,
//     style: { marginTop: "10vh" },
//   });
// };

// // ============================================================================
// function LoginPage(props) {
//   const dispatch = useDispatch();

//   const onSubmitHandler = (values) => {
//     // values = {email: "", password: "", remember: true/false}

//     dispatch(loginUser(values)).then((response) => {
//       if (response.payload.loginSuccess) {
//         window.localStorage.setItem("userId", response.payload.userId);
//         if (values.remember === true) {
//           window.localStorage.setItem("remember", true);
//         } else {
//           window.localStorage.removeItem("remember");
//         }
//         props.history.push("/");
//       } else {
//         onSubmitErrorHandler(response.payload.message);
//       }
//     });
//   };

//   return (
//     <Row justify="center" align="middle" style={{ height: "80vh" }}>
//       <Form
//         name="basic"
//         layout="vertical"
//         style={{ width: "27rem", padding: "4rem", border: "1px solid rgba(0, 0, 0, 0.10)" }}
//         initialValues={{ remember: true }}
//         onFinish={onSubmitHandler}
//         onFinishFailed={onSubmitErrorHandler}
//       >
//         {/* HEADER ---------------------------------------------------------*/}
//         <h2 style={{ margin: "0 0 2rem 0" }}>Sign In</h2>

//         {/* EMAIL ----------------------------------------------------------*/}
//         <Form.Item
//           label="Email"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Please type in your email.",
//             },
//           ]}
//         >
//           <Input type="email" />
//         </Form.Item>

//         {/* PASSWORD -------------------------------------------------------*/}
//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please type in your password.",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         {/* REMEMBER ME CHECKBOX -------------------------------------------*/}
//         <Form.Item name="remember" valuePropName="checked">
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         {/* SUBMIT BUTTON --------------------------------------------------*/}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>

//         {/* LINK -----------------------------------------------------------*/}
//         <Form.Item>
//           Or <Link to="/register">register now!</Link>
//         </Form.Item>
//       </Form>
//     </Row>
//   );
// }

// export default withRouter(LoginPage);

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { Formik } from "formik";
import * as Yup from "yup";
import { Row, Form, Input, Button, Checkbox, message } from "antd";
import { useDispatch } from "react-redux";

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const onSubmitErrorHandler = (error_message) => {
    message.error({
      content: error_message,
      style: { marginTop: "10vh" },
    });
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : "";

  const signinSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please check your email format.")
      .required("Please type in your email."),
    password: Yup.string()
      .min(6, "Your password must be at least 6 characters long.")
      .required("Please type in your password."),
  });

  return (
    <Row justify="center" align="middle" style={{ height: "80vh" }}>
      <Formik
        initialValues={{
          email: initialEmail,
          password: "",
        }}
        validationSchema={signinSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password,
            };

            dispatch(loginUser(dataToSubmit)).then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem("userId", response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem("rememberMe", values.email);
                } else {
                  localStorage.removeItem("rememberMe");
                }
                props.history.push("/");
              } else {
                onSubmitErrorHandler(response.payload.message);
              }
            });
            // .catch((err) => {
            //   setFormErrorMessage("Check out your Account or Password again");
            //   setTimeout(() => {
            //     setFormErrorMessage("");
            //   }, 3000);
            // });
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <div className="app">
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "27rem",
                  padding: "4rem",
                  border: "1px solid rgba(0, 0, 0, 0.10)",
                }}
              >
                <h2 style={{ margin: "0 0 2rem 0" }}>Sign In</h2>
                <Form.Item label="Email" required style={{ display: "block", width: "100%" }}>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? "text-input error" : "text-input"}
                  />

                  {errors.email && touched.email && (
                    <div
                      className="input-feedback"
                      style={{ color: "#ff0000bf", paddingTop: "0.5rem" }}
                    >
                      {errors.email}
                    </div>
                  )}
                </Form.Item>

                <Form.Item label="Password" required style={{ display: "block", width: "100%" }}>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? "text-input error" : "text-input"
                    }
                  />

                  {errors.password && touched.password && (
                    <div
                      className="input-feedback"
                      style={{ color: "#ff0000bf", paddingTop: "0.5rem" }}
                    >
                      {errors.password}
                    </div>
                  )}
                </Form.Item>

                <Form.Item>
                  <Checkbox
                    id="rememberMe"
                    onChange={handleRememberMe}
                    checked={rememberMe}
                    style={{ margin: "0 0 1rem 0" }}
                  >
                    Remember me
                  </Checkbox>
                  <div>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      disabled={isSubmitting}
                      onSubmit={handleSubmit}
                      style={{ margin: "0 0 2rem 0" }}
                    >
                      Submit
                    </Button>
                  </div>
                  Or <a href="/register">register now!</a>
                </Form.Item>
              </form>
            </div>
          );
        }}
      </Formik>
    </Row>
  );
}

export default withRouter(LoginPage);
