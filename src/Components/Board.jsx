import React from "react";

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
      </div>
    </div>
  );
}
