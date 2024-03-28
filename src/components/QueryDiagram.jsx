import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";
import { FaPlay } from "react-icons/fa";

import { RxReset } from "react-icons/rx";

import Editor from "@monaco-editor/react";
import GraphDiagram from "./GraphDiagram";
import { CgSpinner } from "react-icons/cg";

export default function QueryDiagram({ neo4jData }) {
  const [query, setQuery] = useState("");
  const [session, setSession] = useState(null);
  useEffect(() => {
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

    connectDriver();
  }, []);

  const handleQueryRun = async () => {
    try {
      const result = await session.run(query);
      console.log(result.records);
    } catch (err) {
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
          defaultValue="Write your query here"
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
        {neo4jData && <GraphDiagram data={neo4jData} />}
        {!neo4jData && <CgSpinner size={40} className="loader" />}
      </div>
    </>
  );
}
