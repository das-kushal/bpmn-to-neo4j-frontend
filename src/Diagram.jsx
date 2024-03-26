// import {
//   BpmnPropertiesPanelModule,
//   BpmnPropertiesProviderModule,
//   CamundaPlatformPropertiesProviderModule,
// } from "bpmn-js-properties-panel";

// import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
// import "bpmn-js-properties-panel/dist/assets/properties-panel.css";
// import "bpmn-js-properties-panel/dist/assets/element-templates.css";

// import starterBpmn from "./assets/diagram.bpmn";

import { xmlToNeo4j } from "bpmn-to-neo4j-m";

import { useEffect, useRef, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";

import { starterBpmn } from "./assets/starter_bpmn.jsx";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "./index.css";

import DrawerComponent from "./components/DrawerComponent.jsx";

function Diagram() {
  const container = useRef(null);
  const [modeler, setModeler] = useState(null);
  const [bpmn, setBpmn] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const inpRef = useRef(null);

  let modelerInstance = null;

  useEffect(() => {
    if (modelerInstance) return;

    modelerInstance = new Modeler({
      container: container.current,
    });
    modelerInstance.importXML(starterBpmn).then(({ warnings }) => {
      if (warnings.length) {
        console.warn(warnings);
      }

      modelerInstance.get("canvas").zoom("fit-viewport");
    });

    setModeler(modelerInstance);

    return () => {
      modeler?.destroy();
    };
  }, []);

  // file upload end

  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const xml = e.target.result;

      modeler.importXML(xml).then(({ warnings }) => {
        if (warnings.length) {
          console.warn(warnings);
        }

        modeler.get("canvas").zoom("fit-viewport");
      });
    };

    reader.readAsText(file);
  };

  const handleDiagramView = () => {
    setIsOpen((prev) => !prev);
  };

  const handleExport = () => {
    modeler.saveXML({ format: true }).then(({ xml, error }) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log("UPDATE XML:", xml);

      setBpmn(xml);

      xmlToNeo4j(
        xml,
        import.meta.env.VITE_NEO4J_URL,
        import.meta.env.VITE_NEO4J_USERNAME,
        import.meta.env.VITE_NEO4J_PASSWORD
      );
    });
  };

  return (
    <div>
      <div className="modeler-parent">
        <div id="modeler-container" ref={container}></div>
        <span
          style={{
            display: "flex",
            justifyContent: "flex-start",
            padding: 4,
            gap: 10,
            position: "absolute",
            bottom: 10,
            left: 10,
          }}
        >
          <button
            onClick={handleExport}
            // style={{ position: "absolute", bottom: 10, left: 10 }}
          >
            Export BPMN
          </button>
          <input
            type="file"
            ref={inpRef}
            onChange={handleImport}
            style={{
              position: "absolute",
              bottom: 20,
              left: 180,
              display: "none",
            }}
          />
          <button
            onClick={() => inpRef.current.click()}
            // style={{ position: "absolute", bottom: 10, left: 180 }}
          >
            Import BPMN
          </button>
          <button
            disabled={!bpmn}
            onClick={handleDiagramView}
            // style={{ position: "absolute", bottom: 10, left: 350 }}
          >
            Visualise
          </button>
        </span>
      </div>
      <DrawerComponent isOpen={isOpen} onClose={handleDiagramView} />
    </div>
  );
}

export default Diagram;
