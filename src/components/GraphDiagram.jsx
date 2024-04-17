/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Graph from "react-graph-vis";
import { ColorReference } from "../utils/ColorReference";
import { ForceGraph2D } from "react-force-graph";

export default function GraphDiagram({ data }) {
  const [nodeInfo, setNodeInfo] = useState(null);
  const [edgeInfo, setEdgeInfo] = useState(null);

  if (!data) {
    return (
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
        <p>No data to display</p>
      </div>
    );
  }

  function convertNodes(nodesData) {
    const nodes = nodesData.map((node) => {
      const { id, name, type, annotation, marker, eventDefinitions, parent } =
        node;
      return {
        id,
        label: name,
        title: type,
        type,
        annotation,
        marker,
        eventDefinitions,
        parent,
        color: ColorReference[type] || "#F69767",
      };
    });

    return { nodes };
  }

  function convertRelationships(relationshipsData) {
    const edges = relationshipsData.map((relationship) => {
      const { type, source, target } = relationship;
      return {
        from: source.id,
        to: target.id,
        label:
          type !== "RELATIONSHIP" &&
          type !== "DATA_OUTPUT_ASSOCIATION" &&
          type !== "DATA_INPUT_ASSOCIATION"
            ? type
            : "",
        title: `${source.type} to ${target.type}`,
      };
    });
    return { edges };
  }

  function transformData(data) {
    const nodes = convertNodes(data.nodes);
    const edges = convertRelationships(data.relationships);
    return { ...nodes, ...edges };
  }

  const graph = transformData(data);
  console.log(graph);

  const options = {
    edges: {
      color: "#000000",
      //   physics: false,
      //   smooth: {
      //     enabled: true,
      //     type: "continuous",
      //     forceDirection: "none",
      //     roundness: 0.85,
      //   },
      font: {
        size: 15,
        color: "red",
        align: "top",
        vadjust: -2,
        // strokeColor: "#000",
        // strokeWidth: 5,
      },
      length: 200,
      // chosen: true,
    },
    // width: "100%",
    // height: "500px",
    autoResize: true,
    nodes: {
      //   id: nodeInfo,
      widthConstraint: 80,
      shape: "circle",
      //   physics: false,
      color: "#F69767",
      // color: graph?.nodes?.type
      //   ? `rgb(0,0,0)`
      //   : ColorReference[`${graph?.nodes?.type}`],
      // color: (() =>
      //   `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      //     Math.random() * 256
      //   )}, ${Math.floor(Math.random() * 256)})`)(),
      // size: 20,
      fixed: false,
      font: {
        size: 15,
        // color: "#000",
        color: "#fff",
      },
      mass: 2,
    },

    physics: {
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 1,
        onlyDynamicEdges: false,
        fit: true,
      },
    },
    interaction: {
      hover: true,
      dragView: true,
      dragNodes: true,
      navigationButtons: true,
      //   zoomView: true,
      // keyboard: true,
    },

    // physics: {
    //   enabled: true,
    //   barnesHut: {
    //     gravitationalConstant: -30000,
    //     centralGravity: 1.6,
    //   },
    //   minVelocity: 10,
    // },

    // layout: {
    //   improvedLayout: true,
    //   randomSeed: undefined,
    //   clusterThreshold: 150,
    // },

    // physics: {
    //   enabled: true,
    //   barnesHut: {
    //     gravitationalConstant: -2000,
    //     centralGravity: 0.3,
    //     springLength: 35,
    //   },
    //   minVelocity: 0.75, // Adjust as needed
    //   maxVelocity: 50, // Adjust as needed
    // },
    // interaction: {
    //   dragNodes: true,
    //   dragView: true,
    // },
  };

  const events = {
    hoverNode: function (event) {
      // console.log("hoverNode event: ", event);
      const { node } = event;
      // console.log(node);
      if (node) {
        // const nodeId = node;
        const nodeIn = graph.nodes.find((n) => n.id === node);
        // console.log("node ", nodeIn);
        setNodeInfo(nodeIn);
        setEdgeInfo(null);
      } else {
        setNodeInfo(null);
      }
    },
    hoverEdge: function (event) {
      // console.log("edge clicked ", event);
      const { edge } = event;
      if (edge) {
        const edgeIn = graph.edges.find((e) => e.id === edge);
        // console.log("edge ", edgeIn);
        setEdgeInfo(edgeIn);
        setNodeInfo(null);
      } else {
        setEdgeInfo(null);
      }
    },
    blurEdge: function () {
      setEdgeInfo(null);
    },

    blurNode: function () {
      setNodeInfo(null);
    },

    // stabilizationIterationsDone: function () {
    //   const updatedGraph = graph.nodes.map((node) => {
    //     return {
    //       ...node,
    //       color: ColorReference[`${node.type}`],
    //     };
    //   });

    //   graph = updatedGraph;
    // },
  };

  const renderNodeBadges = (nodeInfo) => {
    const badges = [];
    for (const key in nodeInfo) {
      if (
        nodeInfo[key] &&
        typeof nodeInfo[key] === "string" &&
        key !== "color"
      ) {
        badges.push(
          <span key={key} className="badge">
            {key}: {nodeInfo[key]}
          </span>
        );
      }

      if (nodeInfo[key] && typeof nodeInfo[key] === "object") {
        for (const k in nodeInfo[key]) {
          if (nodeInfo[key][k] && typeof nodeInfo[key][k] === "string") {
            badges.push(
              <span key={k} className="badge">
                {k}: {nodeInfo[key][k]}
              </span>
            );
          }
        }
      }
    }
    return badges;
  };

  const renderEdgeBadges = (edgeInfo) => {
    const badges = [];
    for (const key in edgeInfo) {
      if (edgeInfo[key] && typeof edgeInfo[key] === "string" && key !== "id") {
        badges.push(
          <span key={key} className="badge">
            {key}: {edgeInfo[key]}
          </span>
        );
      }
    }
    return badges;
  };

  return (
    <div
      style={{
        height: "100%",
        width: "96%",
        padding: "1em",
        // margin: "auto",
        // border: "1px solid red",
        position: "relative",
        flex: 1,
      }}
    >
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          network.on("stabilized", function () {
            network.fit();
          });
        }}
        style={{
          border: "1px solid #dee1e2",
          backgroundColor: "#F9FCFF",
          height: "75%",
          borderRadius: "6px",
        }}
      />
      {/* <ForceGraph2D graphData={graph} nodeAutoColorBy="type" linkColor="red" /> */}
      {!nodeInfo && !edgeInfo && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // padding: "1em",
            // padding: ".4em",
            flexDirection: "column",
            width: "100%",
            // border: "1px solid red",
          }}
        >
          <p>Hover on a node or edge to view more information</p>
        </div>
      )}
      {nodeInfo && (
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
          <p>Node Info:</p>
          {/* <p>ID: {nodeInfo.id}</p>
          <p>Label: {nodeInfo.label}</p>
          <p>ParentId : {nodeInfo?.parent?.parentId}</p>
          <p>ParentName : {nodeInfo?.parent?.parentName}</p> */}
          {/* Add other node information as needed */}
          <div className="badges-row">{renderNodeBadges(nodeInfo)}</div>
        </div>
      )}
      {edgeInfo && (
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
          <p>Edge Info:</p>
          {/* <p>From: {edgeInfo.from}</p>
          <p>To: {edgeInfo.to}</p> */}
          {/* Add other edge information as needed */}
          <div className="badges-row">{renderEdgeBadges(edgeInfo)}</div>
        </div>
      )}
    </div>
  );
}
