import fs from 'fs'
import { pathForRun } from './utils.js'

export const DEFAULT_RATING = 1500

export function calculateElo(winnerRating, loserRating) {
  const k = 32
  const expectedWinner =
    1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400))
  const expectedLoser = 1 - expectedWinner
  return [
    winnerRating + k * (1 - expectedWinner),
    loserRating + k * (0 - expectedLoser),
  ]
}

export function calculateRating(winnerRating, loserRating) {
  return calculateElo(winnerRating, loserRating)
}

export function getRatingsForMatchups(run, model) {
  const runPath = pathForRun(run)
  const matchups = JSON.parse(fs.readFileSync(`${runPath}/matchups.json`))
  const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))

  for (let i = 0; i < matchups.length; i++) {
    const matchup = matchups[i]
    const fileName = `${runPath}/${model}/intents/${matchup.id}.json`

    if (!fs.existsSync(fileName)) {
      console.log(fileName)
      continue
    }

    const user1 = users.find((u) => u.id === matchup.users[0])
    const user2 = users.find((u) => u.id === matchup.users[1])

    const intentResponse = JSON.parse(fs.readFileSync(fileName))
    const intentText = intentResponse.choices[0].message.content
      .toLowerCase()
      .replace(/ /g, '')

    const user1Won = intentText === 'text1'
    const winner = user1Won ? user1 : user2
    const loser = user1Won ? user2 : user1

    const [newWinnerRating, newLoserRating] = calculateRating(
      winner.rating,
      loser.rating
    )

    winner.rating = newWinnerRating
    loser.rating = newLoserRating
  }

  fs.writeFileSync(
    `${runPath}/${model}/users.json`,
    JSON.stringify(users, null, 2)
  )
}
