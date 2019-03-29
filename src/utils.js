export const clone = matrix => JSON.parse(JSON.stringify(matrix));

export function rotate(matrix, ccw) {
  const columns = matrix.map((_, column) => {
    const x = matrix.map(row => row[column]);
    return ccw ? x : x.reverse();
  });

  return ccw ? columns.reverse() : columns;
}
