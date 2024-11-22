import React from "react";
import Header from "./Header";

export default function ({ children }) {
  return (
    <>
      <Header />
      <main className="Container">{children}</main>
    </>
  );
}
