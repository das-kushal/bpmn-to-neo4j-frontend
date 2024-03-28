/* eslint-disable react/prop-types */
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import GraphDiagram from "./GraphDiagram";

export default function DrawerComponent({ isOpen, onClose, neo4jData }) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size={"70vw"}
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
        {/* <button
          onClick={onClose}
          style={{
            // padding: "10px",
            margin: "3px",
            // boxShadow: "0px 0px 10px 3px #000000",
          }}
        >
          {" "}
          close{" "}
        </button> */}
        <span>Neo4j Graph</span>
        {/* <div> */}
        {/* <input
          type="text"
          style={{ width: "80%" }}
          placeholder="Place your query here"
        /> */}
        {/* </div> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: ".3em",
          // border: "1px solid red",
          height: "100%",
          flexDirection: "column",
        }}
      >
        {neo4jData && <GraphDiagram data={neo4jData} />}
      </div>
      {/* <h1>neo4j diagram to be shown here</h1> */}
    </Drawer>
  );
}
