import React from "react";
//WHenevr you used use hook import it from React
const Test = ({ prop }) => {
  setTimeout(() => {
    console.log(prop);
    prop = "";
    console.log(prop);
  }, 3000);
  return <h2>{prop}</h2>;
};

export default Test;
