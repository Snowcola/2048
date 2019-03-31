import React from "react";
import { useSpring, animated } from "react-spring";
import Tile, { BlankTile } from "./Tile";

export default function Board(props) {
  const { grid, tileSize, size, tilepadding, ui_grid } = props;
  return (
    <div className="container">
      <div
        className="board"
        style={{
          position: "relative",
          width: tileSize * size + tilepadding * 2,
          height: tileSize * size + tilepadding * 2
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) =>
            cell !== 0 ? (
              <AnimatedTile
                key={cell.key}
                tileKey={cell.key}
                tileSize={tileSize}
                tilepadding={tilepadding}
                row={r}
                col={c}
                cell={cell}
              />
            ) : (
              <></>
            )
          )
        )}

        {grid.map((row, r) =>
          row.map((cell, c) => (
            <BlankTile
              row={r}
              col={c}
              tileSize={tileSize}
              tilepadding={tilepadding}
            />
          ))
        )}
      </div>
    </div>
  );
}

function AnimatedTile(props) {
  const cell = props.cell;
  const z = props.zindex || 10;
  const { row, col, oldRow, oldCol, merged, newTile } = cell;
  const size = props.tileSize;
  const style = useSpring({
    from: newTile
      ? { scale: 0.1, opacity: 0 }
      : {
          left: (!merged ? oldCol : props.col) * size + "px",
          top: (!merged ? oldRow : props.row) * size + "px",
          scale: 0
        },
    to: {
      left: (cell ? col : props.col) * size + "px",
      top: (cell ? row : props.row) * size + "px",
      scale: 0,
      opacity: 1
    }
  });

  return (
    <animated.div
      className="tile"
      style={{
        zIndex: z,
        ...style,
        width: size,
        height: size
      }}
    >
      <Tile {...props} />
    </animated.div>
  );
}

function Test() {}
