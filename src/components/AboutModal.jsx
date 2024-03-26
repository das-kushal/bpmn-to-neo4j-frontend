import React from "react";
import Modal, { setAppElement } from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "300px",
    boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.1)",
    opacity: "1",
    zIndex: 10,
  },
};
setAppElement("#root");
export default function AboutModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="About Modal"
      overlayClassName="Overlay"
    >
      <h3>What is this site about ?</h3>
      <p>
        We have made a BPMN editor which lets a user create a BPMN diagram and
        then export it to a Neo4j database and also visualise the diagram.
      </p>
      <h4>Features</h4>
      <ul>
        <li>Create BPMN diagram</li>
        <li>Import BPMN digram from a file</li>
        <li>Download BPMN 2.0 XML</li>
        <li>Download BPMN diagram as SVG</li>
        <li>Export the BPMN diagram to Neo4j database</li>
        <li>Visualise the Neo4j data in a graph form</li>
      </ul>
    </Modal>
  );
}
