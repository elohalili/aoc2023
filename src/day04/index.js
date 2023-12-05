import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let points = 0
  input.map(line => {
    const [cardNum, scratchCard] = line.replaceAll('  ', ' ').split(':')
    let [winnerNumb, numbers] = scratchCard.split('|')
    winnerNumb = winnerNumb.trim().split(' ')
    numbers = numbers.trim().split(' ')
    let cardPoints = 0
    winnerNumb.map(wNum => {
      if (numbers.indexOf(wNum) != -1)
        cardPoints = !cardPoints ? 1 : cardPoints * 2
    })
    points += cardPoints
  })
  return points;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const winnerCards = []

  input.map((line, cardIdx) => {
    const [cardNum, scratchCard] = line.replaceAll('  ', ' ').split(':')
    let [winnerNumb, numbers] = scratchCard.split('|')
    winnerNumb = winnerNumb.trim().split(' ')
    numbers = numbers.trim().split(' ')
    let wins = 0
    winnerNumb.map(wNum => {
      if (numbers.indexOf(wNum) != -1)
        wins++;
    })
    winnerCards.push(wins)
  })

  const totCards = [...winnerCards]
  let totNumberCards = winnerCards.length;

  const cycleCards = (startIdx, cards) => {
    cards.map((wins, idx) => {
      const actualIndex = startIdx + 1 + idx;
      if (wins > 0) {
        let addedCards = winnerCards.slice(actualIndex, actualIndex + wins)
        totNumberCards += addedCards.length
        cycleCards(actualIndex, addedCards)
      }
    })
  }
  cycleCards(0, totCards)
  return totNumberCards
}


run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
