import React from "react";

const styles = {
  backgroudColor: "brown",
  color: "tan",
  borderRadius: "10px",
  padding: "5px 20px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  border: "none"
};
export default function Button(props) {
  return (
    <button onClick={props.click} style={styles}>
      {props.children}
    </button>
  );
}
