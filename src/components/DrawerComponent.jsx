/* eslint-disable react/prop-types */
import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";
import GraphDiagram from "./GraphDiagram";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import QueryDiagram from "./QueryDiagram";
import { CgSpinner } from "react-icons/cg";

export default function DrawerComponent({ isOpen, onClose, neo4jData }) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size={"70vw"}
      //   className="bla bla bla"
    >
      <Tabs
        style={{
          height: "100%",
        }}
      >
        <TabList
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f5f5",
            margin: 0,
          }}
        >
          <Tab>Full Graph</Tab>
          <Tab>Query</Tab>
        </TabList>

        <TabPanel
          style={{
            height: "100%",
            padding: 0,
            margin: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // margin: 0,
              // marginTop: ".3em",
              // border: "1px solid red",
              height: "100%",
              flexDirection: "column",
            }}
          >
            {neo4jData && <GraphDiagram data={neo4jData} />}
            {!neo4jData && <CgSpinner size={40} className="loader" />}
          </div>
        </TabPanel>
        <TabPanel style={{ overflowY: "scroll", maxHeight: "100%" }}>
          <QueryDiagram neo4jData={neo4jData} />
          {/* <h2>hello world</h2> */}
        </TabPanel>
      </Tabs>
    </Drawer>
  );
}
