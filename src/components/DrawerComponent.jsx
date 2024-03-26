/* eslint-disable react/prop-types */
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

export default function DrawerComponent({ isOpen, onClose }) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="top"
      size={"50vh"}
      //   className="bla bla bla"
    >
      {/* <div>
        <div>Query</div>
        <div>
          <input type="text" placeholder="Place your query here" />
        </div>
      </div> */}
      <h1>neo4j diagram to be shown here</h1>
    </Drawer>
  );
}
