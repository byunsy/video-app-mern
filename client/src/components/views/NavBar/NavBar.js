import React, { useState } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import NavDrawer from "./NavDrawer";
import { Button } from "antd";

function Navbar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="/">logo</a>
      </div>

      <div className="menuCon">
        <div className="leftMenu">
          <LeftMenu />
        </div>

        <div className="rightMenu">
          <RightMenu />
        </div>

        <Button className="barsMenu" type="link" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>

        <NavDrawer onClose={onClose} visible={visible} />
      </div>
    </nav>
  );
}
export default Navbar;
