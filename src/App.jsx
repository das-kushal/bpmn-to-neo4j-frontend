// import Diagram from "./Diagram";

import React, { Suspense } from "react";
import Loading from "./components/Loading";

const Diagram = React.lazy(() => import("./Diagram"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Diagram />
    </Suspense>
  );
}

export default App;
