// import Diagram from "./Diagram";

import React, { Suspense } from "react";
import Loading from "./components/Loading";
import { isIE, isMobile, MobileView, BrowserView } from "react-device-detect";

const Diagram = React.lazy(() => import("./Diagram"));

function App() {
  if (isIE) {
    return (
      <div>
        {" "}
        Internet Explorer(IE) is not supported. Download Chrome/Opera/Firefox{" "}
      </div>
    );
  }
  if (isMobile) {
    return (
      <MobileView>
        <div> This content is available only on large screens</div>
      </MobileView>
    );
  }
  return (
    <BrowserView>
      <Suspense fallback={<Loading />}>
        <Diagram />
      </Suspense>
    </BrowserView>
  );
}

export default App;
