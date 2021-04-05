import React from "react";
import { Drawer } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function NavDrawer(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("remember");
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  // If the user is not logged in
  if (user.userData && !user.userData.isAuth) {
    return (
      <Drawer
        // title="Basic Drawer"
        placement="right"
        closable={true}
        onClose={props.onClose}
        visible={props.visible}
        width="70vw"
      >
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/login">Sign In</a>
        <a href="/register">Register</a>
      </Drawer>
    );
  } else {
    return (
      <Drawer
        // title="Basic Drawer"
        placement="right"
        closable={true}
        onClose={props.onClose}
        visible={props.visible}
        width="70vw"
      >
        <a href="/">Home</a>
        <a href="/">About</a>
        <a onClick={logoutHandler}>Sign Out</a>
      </Drawer>
    );
  }
}

export default withRouter(NavDrawer);
