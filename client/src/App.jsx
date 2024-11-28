import {} from "react";
import Header from "./components/header";
import Content from "./components/Content";
import { ToasterProvider } from "./providers/toast-provider";
import { ReactFlowProvider } from "@xyflow/react";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>
        <ToasterProvider />
        <Header />
        <Content />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
