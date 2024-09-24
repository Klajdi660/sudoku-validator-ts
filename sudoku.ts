const isValidDimension = (grid: number[][]): boolean => {
  const N = grid.length;
  const sqrtN = Math.sqrt(N);
  return sqrtN % 1 === 0;
};

const containsAllNumbers = (arr: number[], N: number): boolean => {
  const seen = new Set<number>();
  for (let num of arr) {
    if (num < 1 || num > N || seen.has(num)) {
      return false;
    }
    seen.add(num);
  }
  return seen.size === N;
};

const validateRows = (grid: number[][]): boolean => {
  const N = grid.length;
  for (let row of grid) {
    if (!containsAllNumbers(row, N)) {
      return false;
    }
  }
  return true;
};

const validateColumns = (grid: number[][]): boolean => {
  const N = grid.length;
  for (let col = 0; col < N; col++) {
    const column = grid.map((row) => row[col]);
    if (!containsAllNumbers(column, N)) {
      return false;
    }
  }
  return true;
};

const validateSubgrids = (grid: number[][]): boolean => {
  const N = grid.length;
  const sqrtN = Math.sqrt(N);

  for (let rowStart = 0; rowStart < N; rowStart += sqrtN) {
    for (let colStart = 0; colStart < N; colStart += sqrtN) {
      const subgrid: number[] = [];
      for (let r = rowStart; r < rowStart + sqrtN; r++) {
        for (let c = colStart; c < colStart + sqrtN; c++) {
          subgrid.push(grid[r][c]);
        }
      }
      if (!containsAllNumbers(subgrid, N)) {
        return false;
      }
    }
  }
  return true;
};

const isValidSudoku = (grid: number[][]): boolean => {
  return (
    isValidDimension(grid) &&
    validateRows(grid) &&
    validateColumns(grid) &&
    validateSubgrids(grid)
  );
};

const sudoku = [
  [7, 8, 4, 1, 5, 9, 3, 2, 6],
  [5, 3, 9, 6, 7, 2, 8, 4, 1],
  [6, 1, 2, 4, 3, 8, 7, 5, 9],
  [9, 2, 8, 7, 1, 5, 4, 6, 3],
  [3, 5, 7, 8, 4, 6, 1, 9, 2],
  [4, 6, 1, 9, 2, 3, 5, 8, 7],
  [8, 7, 6, 3, 9, 4, 2, 1, 5],
  [2, 4, 3, 5, 6, 1, 9, 7, 8],
  [1, 9, 5, 2, 8, 7, 6, 3, 4],
];

console.log("Result:", isValidSudoku(sudoku));
