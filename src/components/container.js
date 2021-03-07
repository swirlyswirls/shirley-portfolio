import React from "react";
import GlobalStyles from "../styles/GlobalStyles";

export default ({ children }) => (
  // <div style={{ maxWidth: 1180, margin: '0 auto' }}>
  <div>
    <GlobalStyles />
    {children}
  </div>
);
