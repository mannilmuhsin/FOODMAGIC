import { Outlet } from "react-router-dom";

import React from "react";

function Layouts() {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

export default Layouts;
