import React from "react";
import News from "./news";
import QueryForm from "./query_form";
import { useCountry } from "../context/countryProvider";

function UI() {
  return (
    <>
      <div className="left UI-container">
        < QueryForm />
      </ div>
      <div className="right UI-container">
        <News />
      </ div>
    </>
  );

}

export default UI;
