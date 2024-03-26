/* eslint-disable react/prop-types */
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import GraphDiagram from "./GraphDiagram";

export default function DrawerComponent({ isOpen, onClose }) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size={"50vw"}
      //   className="bla bla bla"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // padding: "1em",
          padding: ".4em",
          flexDirection: "column",
          width: "100%",
          // border: "1px solid red",
        }}
      >
        {/* <span>Query</span> */}
        {/* <div> */}
        <input
          type="text"
          style={{ width: "80%" }}
          placeholder="Place your query here"
        />
        {/* </div> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: ".3em",
          border: "1px solid red",
          height: "100%",
        }}
      >
        <GraphDiagram />
      </div>
      {/* <h1>neo4j diagram to be shown here</h1> */}
    </Drawer>
  );
}
