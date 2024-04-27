/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import neo4j from "neo4j-driver";
import { FaPlay } from "react-icons/fa";

import { RxReset } from "react-icons/rx";

import Editor from "@monaco-editor/react";
import GraphDiagram from "./GraphDiagram";
import { CgSpinner } from "react-icons/cg";

import toast, { Toaster } from "react-hot-toast";

export default function QueryDiagram({ neo4jData }) {
  const [query, setQuery] = useState("");
  const [session, setSession] = useState(null);
  const [adjMatrix, setAdjMatrix] = useState({});
  const [graphData, setGraphData] = useState(neo4jData);

  // const errorRef = useRef(null);

  const notify = (err) => toast.error("SYNTAX ERROR: " + err);

  // const errorRef = useRef(null);
  /* {
    "type": "RELATIONSHIP",
    "source": {
        "type": "StartEvent",
        "id": "Event_0d5lr0o"
    },
    "target": {
        "type": "Task",
        "id": "Activity_1p8iqcn"
    }
} */
  useEffect(() => {
    const createAdjMatrix = (neo4jData) => {
      let matrix = {};
      neo4jData.relationships.forEach((rel) => {
        if (matrix[rel.source.id]) {
          matrix[rel.source.id].push(rel);
        } else {
          matrix[rel.source.id] = [rel];
        }
      });
      setAdjMatrix(matrix);
    };
    // setGraphData(neo4jData);
    const connectDriver = () => {
      const driver = neo4j.driver(
        import.meta.env.VITE_NEO4J_URL,
        neo4j.auth.basic(
          import.meta.env.VITE_NEO4J_USERNAME,
          import.meta.env.VITE_NEO4J_PASSWORD
        )
      );

      setSession(driver.session());
    };

    createAdjMatrix(neo4jData);

    connectDriver();
  }, []);

  const handleQueryRun = async () => {
    let nodesObj = {};
    let relationships = [];
    let nodes = [];
    async function processQuery(query) {
      query.forEach((record) => {
        record._fields.forEach((field) => {
          if (!field.start && !field.end) {
            nodesObj[field.elementId] = {
              id: field.properties.id,
              name: field.properties.name || "",
              type: field.labels[0],
              annotation: field.properties.annotation || "",
              marker: field.properties.marker || "",
              eventDefinitions: field.properties.eventDef_type || "",
              parent: field.properties.parent_id
                ? {
                    parentId: field.properties.parent_id,
                    parentName: field.properties.parent_name,
                  }
                : null,
            };
          }
        });
      });
      nodes = Object.values(nodesObj);
      nodes.forEach((node) => {
        if (adjMatrix[node.id]) {
          relationships = [...relationships, ...adjMatrix[node.id]];
        }
      });
      console.log("nodes", nodes, "relationships", relationships);
      setGraphData({
        nodes: nodes,
        relationships: relationships,
      });
      // console.log(nodes, relationships);
    }
    try {
      const result = await session.run(query);
      await processQuery(result.records);
      toast.success("Query executed successfully");
      console.log(result.records);
    } catch (err) {
      notify(err.message);

      // alert(err);
      console.error(err);
    }
  };

  const monacoOptions = {
    renderLineHighlight: "none",
    quickSuggestions: false,
    glyphMargin: false,
    lineDecorationsWidth: 0,
    folding: false,
    fixedOverflowWidgets: true,
    acceptSuggestionOnEnter: "on",
    hover: {
      delay: 100,
    },
    roundedSelection: false,
    contextmenu: false,
    cursorStyle: "line-thin",
    occurrencesHighlight: false,
    links: false,
    minimap: { enabled: false },
    wordBasedSuggestions: false,
    // disable `Find`
    find: {
      addExtraSpaceOnTop: false,
      autoFindInSelection: "never",
      seedSearchStringFromSelection: "never",
    },
    fontSize: 14,
    fontWeight: "normal",
    wordWrap: "off",
    lineNumbers: "off",
    lineNumbersMinChars: 0,
    overviewRulerLanes: 0,
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    scrollBeyondLastColumn: 0,
    scrollbar: {
      horizontal: "hidden",
      vertical: "hidden",
      // avoid can not scroll page when hover monaco
      alwaysConsumeMouseWheel: false,
    },
  };

  return (
    <
      //   style={{
      //     display: "flex",
      //     flexDirection: "column",
      //     justifyContent: "space-around",
      //     alignItems: "center",
      //     height: "100%",
      //     width: "90%",
      //     padding: "1em",
      //     margin: "auto",
      //   }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          paddingTop: 10,
          //   marginLeft: 10,
          gap: 5,
          width: "96%",
          margin: "auto",
          //   height: "10vh",
          //   width: "100%",
        }}
      >
        {/* <label htmlFor="query">Write your Query</label> */}
        {/* <textarea
          type="text"
          name="query"
          value={query}
          id="query"
          style={{ width: "85%" }}
          //   rows={1}
          placeholder="Enter your query here"
          onChange={(e) => setQuery(e.target.value)}
        /> */}
        <Editor
          className="query"
          height="11vh"
          defaultLanguage="cypher"
          //   placeholder="Write your query here"
          defaultValue="match (n) return n;"
          value={query}
          onChange={(value) => setQuery(value)}
          //   options={{
          //     minimap: { enabled: false },
          //     scrollbar: { vertical: "hidden", horizontal: "hidden" },
          //     renderLineHighlight: false,
          //     lineNumbers: "off",
          //   }}

          options={monacoOptions}
        />

        {/* <button ref={errorRef} onClick={notify} style={{ display: "none" }}>
          Notify!
        </button> */}
        <Toaster />

        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button onClick={handleQueryRun} disabled={!query}>
            <FaPlay size={24} />
          </button>
          <button onClick={() => setQuery("")}>
            <RxReset size={24} />
          </button>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // margin: 0,
          // marginTop: ".3em",
          // border: "1px solid red",
          height: "82.5vh",
          flexDirection: "column",
        }}
      >
        {graphData && <GraphDiagram data={graphData} />}
        {!graphData && <CgSpinner size={40} className="loader" />}
      </div>
    </>
  );
}
