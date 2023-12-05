import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const inputLines = parseInput(rawInput)

  const res = inputLines.reduce((acc, curr) => {
    // get only numbers from the string
    const currNumLine = curr.match(/[0-9]/g)

    let currNum = 0
    // console.log(currNumLine);
    if (currNumLine?.length)
      // parse only the first and last
      currNum = parseInt(`${currNumLine[0]}${[...currNumLine].reverse()[0]}`)
    return acc + currNum
  }, 0)
  return res.toString()
}

const part2 = (rawInput) => {
  const numbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
  ]
  const numbers2 = [
    'on1e',
    'tw2o',
    'thr3ee',
    'fo4ur',
    'fi5ve',
    'si6x',
    'sev7en',
    'ei8ght',
    'ni9ne'
  ]
  let input = rawInput
  numbers.map((n, i) => {
    input = input.replaceAll(n, numbers2[i])
  })
  const inputLines = parseInput(input)

  const res = inputLines.reduce((acc, curr) => {
    // get only numbers from the string
    const currNumLine = curr.match(/[0-9]/g)

    let currNum = 0
    // console.log(currNumLine);
    if (currNumLine?.length)
      // parse only the first and last
      currNum = parseInt(`${currNumLine[0]}${[...currNumLine].reverse()[0]}`)
    currNumLine?.length == 1 && console.log(currNumLine, currNum, curr)
    return acc + currNum
  }, 0)
  return res.toString()
}


run({
  part1: {
    tests: [
      {
        input: `1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`,
        expected: "142",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `npeight
            kbdrczcmsbfives4two9sevenseven
            ninelmrkgtfive145five
            5two92eightdspeight
            6zxtlvlrcl`,
        expected: "364",
      },
      {
        input: `two1nine
      eightwothree
      abcone2threexyz
      xtwone3four
      4nineeightseven2
      zoneight234
      7pqrstsixteen`,
        expected: "281",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
