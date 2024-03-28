import React, { useState, useEffect } from "react";
import neo4j from "neo4j-driver";
import { FaPlay } from "react-icons/fa";

import { RxReset } from "react-icons/rx";

import Editor from "@monaco-editor/react";

export default function QueryDiagram({ neo4jData }) {
  const [query, setQuery] = useState("MATCH (n) RETURN n;");
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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 10,
          gap: 10,
        }}
      >
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
          height="10vh"
          defaultLanguage="cypher"
          defaultValue="MATCH (n) RETURN n;"
          value={query}
          onChange={(value) => setQuery(value)}
          options={{
            minimap: { enabled: false },
            scrollbar: { vertical: "hidden", horizontal: "hidden" },
            renderLineHighlight: false,
            lineNumbers: "off",
          }}
        />

        <button onClick={handleQueryRun}>
          <FaPlay size={20} />
        </button>
        <button onClick={() => setQuery("")}>
          <RxReset size={20} />
        </button>
      </div>
    </>
  );
}
