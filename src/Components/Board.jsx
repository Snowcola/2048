import React from "react";
import { useSpring, animated } from "react-spring";
import Tile from "./Tile";

export default function Board(props) {
  const { grid, tileSize, size, tilepadding } = props;
  return (
    <div className='container'>
      <div
        className='board'
        style={{
          position: "relative",
          width: tileSize * size + tilepadding * 2,
          height: tileSize * size + tilepadding * 2
          //backgroundColor: 'silver',
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <AnimatedTile
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
      </div>
    </div>
  );
}

function AnimatedTile(props) {
  const cell = props.cell;
  const { row, col, oldRow, oldCol, merged, newTile } = cell;
  const size = props.tileSize;
  const style = useSpring({
    from: {
      left: (cell && !merged ? cell.oldCol : props.col) * size + "px",
      top: (cell && !merged ? cell.oldRow : props.row) * size + "px"
    },
    to: {
      left: (cell ? cell.col : props.col) * size + "px",
      top: (cell ? cell.row : props.row) * size + "px"
    }
  });

  return (
    <animated.div
      className='tile'
      style={{
        zIndex: 10,
        ...style,
        width: size,
        height: size
      }}
    >
      <Tile {...props} />
    </animated.div>
  );
}
