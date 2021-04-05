import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";
import { ReactComponent as LandingPic } from "../../../landing2.svg";
import "./LandingPage.css";

function LandingPage(props) {
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("Failed to sign out.");
      }
    });
  };

  return (
    <div className="container">
      {/* <div>
        <button onClick={onClickHandler}>Sign Out</button>
      </div> */}
      <LandingPic className="landing-pic" />
      <div className="landing-info">
        <h1>Landing Page</h1>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
