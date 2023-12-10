import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let [seeds, ...category] = input
  seeds = seeds.split(':')[1].trim().split(' ').map(e => ({
    seed: Number(e),
    lastChange: null
  }))
  category = category.map(line => {
    let values = line.split(':')[1].trim()
    values = values.split('\n')
    return values.map(l => l.split(' ').map(e => Number(e)))
  })

  // console.log(seeds);
  console.table(category.length);

  category.forEach((map, mapIdx) => {
    map.forEach(line => {
      let [dest, source, len] = line
      seeds.map(({ seed, lastChange }, i) => {
        if (seed >= source && seed <= source + len - 1) {
          if (lastChange != mapIdx) {
            seeds[i].seed = dest + seed - source
            seeds[i].lastChange = mapIdx
          }
        }
      })
    })
  });
  return seeds.map(e => e.seed).sort()[0]
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
