import React from "react";
import Color from "color";

export default function Tile(props) {
  const { tileKey, tileSize, tilepadding, row, col, cell } = props;
  return (
    <div
      key={tileKey}
      className="tile"
      style={{
        top: row * tileSize,
        left: col * tileSize,
        width: tileSize,
        height: tileSize,
        margin: `${tilepadding}px`
      }}
    >
      <div
        className="value"
        style={{
          backgroundColor: colors[cell]
        }}
      >
        {cell !== 0 ? cell : ""}
      </div>
    </div>
  );
}

const colors = {
  0: "#dcb",
  2: "#eee",
  4: "#eec",
  8: "#fb8",
  16: "#f96",
  32: " #f75",
  64: "#f53",
  128: "#ec7",
  256: "#ec6",
  512: "#ec5",
  1024: "#ec3",
  2048: "#ec2"
};
