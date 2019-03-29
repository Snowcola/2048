import React from "react";
import { useSpring, animated } from "react-spring";
import Tile from "./Tile";

export default function Board(props) {
  const { grid, tileSize, size, tilepadding } = props;
  return (
    <div className="container">
      <div
        className="board"
        style={{
          position: "relative",
          width: tileSize * size + tilepadding * 2,
          height: tileSize * size + tilepadding * 2
          //backgroundColor: 'silver',
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <Tile
              key={r + c * Date.now() + 200}
              tileKey={r + c * Date.now()}
              tileSize={tileSize}
              tilepadding={tilepadding}
              row={r}
              col={c}
              cell={cell}
            />
          ))
        )}
        <AnimatedTile />
      </div>
    </div>
  );
}

function AnimatedTile(props) {
  const style = useSpring({
    from: { left: "0px", top: "0px" },
    to: { left: "300px", top: "300px" }
  });
  return (
    <animated.div
      className="tile"
      style={{
        ...style,
        margin: "5px",
        width: "100px",
        height: "100px"
      }}
    >
      <div className="value" style={{ backgroundColor: "red" }}>
        10
      </div>
    </animated.div>
  );
}
