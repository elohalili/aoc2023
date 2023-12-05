import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n")

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const matrix = input.map(line => line.split(''))
  const symbolsPositions = []
  const numbersInTable = []

  let currNumber = ''
  let startingX;
  // find and save all symbol coordinates

  matrix.map((line, y) => {
    line.map((cell, x) => {
      // save symbol if not '.' or a number
      if (cell != '.' && isNaN(cell)) {
        symbolsPositions.push(String(x + '-' + y))
      } else if (!isNaN(cell)) {
        // else save number and it's coordinates
        if (!currNumber.length)
          startingX = x;
        currNumber += cell;
      }
      // if the cell not a number and i still have a number, save it
      if (isNaN(cell) && currNumber.length) {
        numbersInTable.push({
          num: Number(currNumber),
          y,
          startingX,
          endingX: x - 1
        })
        startingX = null;
        currNumber = ''
      }
    })

    // save last number from row
    if (currNumber.length) {
      numbersInTable.push({
        num: Number(currNumber),
        y,
        startingX,
        endingX: line.length - 1
      })
      startingX = null;
      currNumber = ''
    }
  })
  // console.log(symbolsPositions);
  // console.log(numbersInTable);

  // look for numbers adjacent and save the presence
  symbolsPositions.map((symbol, i) => {
    let [x, y] = symbol.split('-');
    x = Number(x)
    y = Number(y)
    // search around the symbol
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        // check boundaries
        if (i < 0 || j < 0 || i > matrix.length - 1 || j > matrix[0].length - 1 ||
          (i == y && j == x))
          continue;
        // check if in this coordinate there's a number
        if (!isNaN(matrix[i][j])) {
          // match the number to the current found numbers
          const number = numbersInTable.find(e => e.y == i && e.startingX <= j && j <= e.endingX)
          number.isPresent = true
        }
      }
    }
  })
  // console.log(numbersInTable);
  // return the sum of all the found numbers
  // console.table(matrix);
  return numbersInTable.reduce((acc, curr) => {
    if (curr.isPresent)
      return acc + curr.num
    return acc
  }, 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const matrix = input.map(line => line.split(''))
  const gearsPositions = []
  const numbersInTable = []

  let currNumber = ''
  let startingX;
  // find and save all symbol coordinates

  matrix.map((line, y) => {
    line.map((cell, x) => {
      // save symbol if not '.' or a number
      if (cell == '*') {
        gearsPositions.push(String(x + '-' + y))
      } else if (!isNaN(cell)) {
        // else save number and it's coordinates
        if (!currNumber.length)
          startingX = x;
        currNumber += cell;
      }
      // if the cell not a number and i still have a number, save it
      if (isNaN(cell) && currNumber.length) {
        numbersInTable.push({
          num: Number(currNumber),
          y,
          startingX,
          endingX: x - 1
        })
        startingX = null;
        currNumber = ''
      }
    })

    // save last number from row
    if (currNumber.length) {
      numbersInTable.push({
        num: Number(currNumber),
        y,
        startingX,
        endingX: line.length - 1
      })
      startingX = null;
      currNumber = ''
    }
  })
  console.log(gearsPositions);
  // console.log(numbersInTable);

  const gearsNumbers = {}

  // look for numbers adjacent and save the presence
  gearsPositions.map((symbol) => {
    let [x, y] = symbol.split('-');
    x = Number(x)
    y = Number(y)
    // search around the symbol
    for (let i = y - 1; i <= y + 1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        // check boundaries
        if (i < 0 || j < 0 || i > matrix.length - 1 || j > matrix[0].length - 1 ||
          (i == y && j == x))
          continue;
        // check if in this coordinate there's a number
        if (!isNaN(matrix[i][j])) {
          // match the number to the current found numbers
          const number = numbersInTable.find(e => e.y == i && e.startingX <= j && j <= e.endingX)
          if (!number.isPresent)
            if (gearsNumbers[symbol])
              gearsNumbers[symbol].push(number.num)
            else
              gearsNumbers[symbol] = [number.num]
          number.isPresent = true
        }
      }
    }
  })
  const correctGears = Object.values(gearsNumbers).filter(g => g.length == 2)
  // return the multiplication of each gear ratio
  // console.table(matrix);
  return correctGears.reduce((acc, curr) => {
    return acc + (curr[0] * curr[1])
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*...3
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*...3
.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
