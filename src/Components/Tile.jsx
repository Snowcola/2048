import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function Tile(props) {
  const { tileSize, tilepadding, cell } = props;
  console.log(JSON.stringify(cell));
  return (
    <div
      className="tile"
      style={{
        width: tileSize,
        height: tileSize,
        margin: `${tilepadding}px`,
      }}
    >
      <div
        className="value"
        style={{
          backgroundColor: colors[cell.value],
        }}
      >
        {cell.value !== 0 ? cell.value : ''}
      </div>
    </div>
  );
}

const colors = {
  0: '#dcb',
  2: '#eee',
  4: '#eec',
  8: '#fb8',
  16: '#f96',
  32: ' #f75',
  64: '#f53',
  128: '#ec7',
  256: '#ec6',
  512: '#ec5',
  1024: '#ec3',
  2048: '#ec2',
};

export function BlankTile({ tileSize, tilepadding, row, col }) {
  return (
    <div
      className="tile"
      style={{
        left: col * tileSize,
        top: row * tileSize,
        width: tileSize,
        height: tileSize,
        margin: `${tilepadding}px`,
        zIndex: 2,
      }}
    >
      <div
        className="value"
        style={{
          backgroundColor: colors[0],
        }}
      >
        {''}
      </div>
    </div>
  );
}
