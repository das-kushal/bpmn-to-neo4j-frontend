import Drawer from "react-modern-drawer";

import "react-modern-drawer/dist/index.css";

export default function DrawerComponent({ isOpen, onClose }) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      size={"50vw"}
      //   className="bla bla bla"
    >
      <div>
        <div>Query</div>
        <div>
          <input type="text" placeholder="Place your query here" />
        </div>
      </div>
    </Drawer>
  );
}
