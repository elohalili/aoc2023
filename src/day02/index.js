import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split("\n")

const red = 'red' //12
const green = 'green' //13
const blue = 'blue' //14

const part1 = (rawInput) => {
  const input = parseInput(rawInput.replaceAll(' ', ''))
  return input.reduce((acc, curr, index) => {
    const gameCubesLine = curr.split(':')[1]
    const cubeSets = gameCubesLine.split(';')
    const possible = cubeSets.every(set => {
      const currSet = {
        redCubes: 0,
        greenCubes: 0,
        blueCubes: 0,
      }
      set.split(',').forEach(cube => {
        if (cube.includes(red)) {
          currSet.redCubes += getNumberFromCube(cube, red)
        } else if (cube.includes(green)) {
          currSet.greenCubes += getNumberFromCube(cube, green)
        } else if (cube.includes(blue)) {
          currSet.blueCubes += getNumberFromCube(cube, blue)
        }
      });
      return (currSet.redCubes <= 12 && currSet.greenCubes <= 13 && currSet.blueCubes <= 14)
    })
    if (possible) {
      return acc + index + 1;
    }
    return acc
  }, 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  return input.reduce((acc, curr, index) => {
    const gameCubesLine = curr.split(':')[1]
    const cubeSets = gameCubesLine.split(';')
    const currSet = {
      redCubes: 0,
      greenCubes: 0,
      blueCubes: 0,
    }
    cubeSets.forEach(set => {
      set.split(',').forEach(cube => {
        if (cube.includes(red)) {
          let redCubes = getNumberFromCube(cube, red)
          currSet.redCubes < redCubes && (currSet.redCubes = redCubes)
        } else if (cube.includes(green)) {
          let greenCubes = getNumberFromCube(cube, green)
          currSet.greenCubes < greenCubes && (currSet.greenCubes = greenCubes)
        } else if (cube.includes(blue)) {
          let blueCubes = getNumberFromCube(cube, blue)
          currSet.blueCubes < blueCubes && (currSet.blueCubes = blueCubes)
        }
      });
    })
    return acc + (currSet.redCubes * currSet.greenCubes * currSet.blueCubes)
  }, 0)
}

const getNumberFromCube = (cube, color) => {
  return Number(cube.replace(color, ''))
}


run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
      {
        input: `Game 1: 20 green, 3 red, 2 blue; 9 red, 16 blue, 18 green; 6 blue, 19 red, 10 green; 12 red, 19 green, 11 blue
Game 2: 12 green, 3 blue, 16 red; 6 red, 4 blue, 12 green; 11 green, 4 red, 3 blue; 8 green, 15 red, 5 blue
Game 3: 13 blue, 4 red, 8 green; 2 green, 4 red, 19 blue; 5 blue; 10 blue, 6 green, 2 red; 19 blue; 8 blue, 6 red
Game 4: 14 green, 8 blue, 10 red; 11 green, 7 blue, 8 red; 8 green, 18 blue, 11 red
Game 5: 7 red, 7 green, 1 blue; 2 red, 1 green, 2 blue; 2 blue, 7 green; 7 red, 3 blue, 11 green`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
