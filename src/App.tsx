import { Component } from "solid-js";
import AppRouters from "./router";

const App: Component = () => {
  return (
    <>
      <div id="popups" />
      <AppRouters />
    </>
  );
};

export default App;
