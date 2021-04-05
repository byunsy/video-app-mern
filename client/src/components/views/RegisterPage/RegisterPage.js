import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter, Link } from "react-router-dom";
import { Row, Form, Input, Button, Checkbox, message } from "antd";

// ============================================================================
function RegisterPage(props) {
  const dispatch = useDispatch();

  const onSubmitHandler = (values) => {
    dispatch(registerUser(values)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <Row justify="center" align="middle" style={{ height: "85vh" }}>
      <Form
        name="basic"
        layout="vertical"
        style={{ width: "27rem", padding: "4rem", border: "1px solid rgba(0, 0, 0, 0.10)" }}
        initialValues={{ remember: true }}
        onFinish={onSubmitHandler}
      >
        {/* HEADER ---------------------------------------------------------*/}
        <h2 style={{ margin: "0 0 2rem 0" }}>Register</h2>

        {/* NAME -----------------------------------------------------------*/}
        <Form.Item
          label="Name"
          name="name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please type in your name.",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>

        {/* EMAIL ----------------------------------------------------------*/}
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please type in your email.",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        {/* PASSWORD -------------------------------------------------------*/}
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please type in your password.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* CONFIRM PASSWORD -----------------------------------------------*/}
        <Form.Item
          label="ConfirmPassword"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password.",
            },
            // Check if password and confirmPassword match
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Please make sure your passwords match."));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* TERMS AND CONDITIONS CHECKBOX ----------------------------------*/}
        <Form.Item
          name="conditions"
          valuePropName="checked"
          rules={[
            // Need to agree to the terms before registering
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Please accept the terms and conditions.")),
            },
          ]}
          style={{ padding: "0 0 0.75rem 0" }}
        >
          <Checkbox>I accept the Terms of Use & Privacy Policy.</Checkbox>
        </Form.Item>

        {/* SUBMIT BUTTON --------------------------------------------------*/}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        {/* LINK -----------------------------------------------------------*/}
        <Form.Item>
          Already have an account? <Link to="/login">Sign in</Link>
        </Form.Item>
      </Form>
    </Row>
  );
}

export default withRouter(RegisterPage);
