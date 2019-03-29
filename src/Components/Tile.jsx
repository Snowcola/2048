import React from "react";
import { useSpring, animated } from "react-spring";

export default function Tile(props) {
  const { tileKey, tileSize, tilepadding, row, col, cell } = props;
  console.log(JSON.stringify(cell));
  return (
    <div
      key={tileKey}
      className='tile'
      style={{
        width: tileSize,
        height: tileSize,
        margin: `${tilepadding}px`
      }}
    >
      <div
        className='value'
        style={{
          backgroundColor: colors[cell.value]
        }}
      >
        {cell.value !== 0 ? cell.value : ""}
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

function AnimatedTile(props) {
  const style = useSpring({
    from: { left: "0px", top: "0px" },
    to: { left: "300px", top: "300px" }
  });
  return (
    <animated.div className='tile' style={style}>
      <div className='value'>10</div>
    </animated.div>
  );
}
