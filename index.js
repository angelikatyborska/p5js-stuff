const p5 = require('p5');

function decimalTo8BitBinaryAsArray(quotient, acc = []) {
  if (quotient === 0) {
    const missingLeadingZeros = 8 - acc.length;
    if (missingLeadingZeros > 0) {
      for (let i = 0; i < missingLeadingZeros; i++) {
        acc.unshift(0)
      }
    }

    return acc;
  } else {
    const remainder = quotient % 2;
    const newQuotient = Math.floor(quotient / 2);
    const newAcc = [remainder, ...acc]
    return decimalTo8BitBinaryAsArray(newQuotient, newAcc);
  }
}

const sketch = (s) => {
  const squareSize = 2;
  const rowLength = 1000;
  const columnLength = 1000;
  const width = rowLength * squareSize;
  const height = columnLength * squareSize;
  const center = Math.floor(rowLength / 2);
  let startingRow = [...(Array(rowLength)).keys()]
  startingRow = startingRow.map((n, i) => i === center ? 1 : 0)

  const rule = 30;
  const reversedRule = decimalTo8BitBinaryAsArray(rule).reverse();

  const grid = [startingRow];

  const calculateRow = (oldRow) => {
    return oldRow.map((n, i, a) => {
      let neighborhoodIndices;

      if (i === 0) {
        neighborhoodIndices = [a.length - 1, i, i + 1]
      } else if (i === a.length - 1) {
        neighborhoodIndices = [i - 1, i, 0]
      } else {
        neighborhoodIndices = [i - 1, i, i + 1]
      }

      const neighborhood = neighborhoodIndices.map(i => a[i])
      const newStateIndex = neighborhood.reverse().reduce((acc, neighbor, j) => {
        return acc + Math.pow(2, j) * neighbor
      }, 0)

      return reversedRule[newStateIndex];
    })
  }

  for (let i = 1; i < columnLength; i++) {
    grid[i] = calculateRow(grid[i - 1]);
  }

  s.setup = () => {
    s.createCanvas(width, height);
    s.noLoop();
  }

  s.draw = () => {
    s.noStroke();
    grid.forEach((row, rowNumber) => {
      row.forEach((n, columnNumber) => {
        if (n === 1) {
          s.fill(0);
        } else {
          s.fill(255);
        }

        s.rect(columnNumber * squareSize, rowNumber * squareSize, squareSize, squareSize);
      })
    })
  }
}

new p5(sketch);
