import fs from 'fs'
import { pathForRun } from './utils.js'
import { extractWinner } from './grade.js'
import { regressionForUsers } from './regression.js'

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

function simpleRating(winnerRating, loserRating) {
  return [winnerRating + 1, loserRating - 1]
}

export function calculateRating(winnerRating, loserRating) {
  // return simpleRating(winnerRating, loserRating)
  return calculateElo(winnerRating, loserRating)
}

let matches = 0
function winnerForMatchup(user1, user2, matchups) {
  const matchup = matchups.find(
    (m) =>
      (m.text1 === user1.id && m.text2 === user2.id) ||
      (m.text1 === user2.id && m.text2 === user1.id)
  )
  if (matchup) {
    matches++
    return matchup.winner
  }
  return null
}

const playRound = (users, matchups) => {
  users.sort((a, b) => b.rating - a.rating || Math.random() - 0.5)
  const pairings = []
  const matched = new Set()

  users.forEach((user, index) => {
    if (!matched.has(user.id)) {
      for (let j = index + 1; j < users.length; j++) {
        const opponent = users[j]
        if (!matched.has(opponent.id) && !user.history.includes(opponent.id)) {
          pairings.push({ user1: user, user2: opponent })
          user.history.push(opponent.id)
          opponent.history.push(user.id)
          matched.add(user.id)
          matched.add(opponent.id)
          break
        }
      }
    }
  })

  for (let pairing of pairings) {
    const winnerId = winnerForMatchup(pairing.user1, pairing.user2, matchups)
    if (!winnerId) {
      continue
    }

    const winner = users.find((u) => u.id === winnerId)
    const loser = winner === pairing.user1.id ? pairing.user2 : pairing.user1
    const [newWinnerRating, newLoserRating] = calculateRating(
      winner.rating,
      loser.rating
    )
    winner.rating = newWinnerRating
    loser.rating = newLoserRating

    winner.score += 1

    // if (winnerId === pairing.user1.id) {
    //   pairing.user1.score += 1
    // } else if (winnerId === pairing.user2.id) {
    //   pairing.user2.score += 1
    // }
  }
}

export function getRatingsForMatchupTournament(run, model) {
  const runPath = pathForRun(run)
  const matchups = JSON.parse(
    fs.readFileSync(`${runPath}/${model}_matchups.json`)
  )
  const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))

  for (let user of users) {
    user.rating = DEFAULT_RATING
    user.score = 0
    user.history = []
  }

  for (let i = 0; i < 256; i++) {
    playRound(users, matchups, i)
  }

  users.sort((a, b) => b.score - a.score)

  fs.writeFileSync(
    `${runPath}/${model}_users_tournament.json`,
    JSON.stringify(users, null, 2)
  )
  console.log(matches)
}

export function getRatingsForMatchups(run, model) {
  const runPath = pathForRun(run)
  const matchups = JSON.parse(fs.readFileSync(`${runPath}/matchups.json`))
  const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))

  // shuffle matchups
  matchups.sort(() => Math.random() - 0.5)

  for (let i = 0; i < matchups.length; i++) {
    const matchup = matchups[i]
    const fileName = `${runPath}/${model}/${matchup.id}.json`

    if (!fs.existsSync(fileName)) {
      continue
    }

    const user1 = users.find((u) => u.id === matchup.text1)
    const user2 = users.find((u) => u.id === matchup.text2)

    const gradeResponse = JSON.parse(fs.readFileSync(fileName))
    const extractedText = extractWinner(gradeResponse)
    if (extractedText === null) {
      console.log('no winner, skip')
      continue
    }
    const user1Won = extractedText == 'text1'
    matchup.winner = user1Won ? user1.id : user2.id
    // let user1Won = user1.avgGrade > user2.avgGrade
    // if (user1.avgGrade === user2.avgGrade) {
    //   user1Won = Math.random() > 0.5
    // }
    // const user1Won = Math.random() > 0.5

    matchup.score = user1Won
      ? user1.avgGrade - user2.avgGrade
      : user2.avgGrade - user1.avgGrade
    const userWithHigherGrade = user1.avgGrade >= user2.avgGrade ? user1 : user2
    matchup.expectedWinnerWon = matchup.winner === userWithHigherGrade.id

    const winner = user1Won ? user1 : user2
    const loser = user1Won ? user2 : user1

    winner.score++
    winner.wins++
    loser.losses++
  }

  // sort users by rating
  users.sort((a, b) => b.rating - a.rating)

  fs.writeFileSync(
    `${runPath}/${model}_matchups.json`,
    JSON.stringify(matchups, null, 2)
  )

  fs.writeFileSync(
    `${runPath}/${model}_users_with_rating.json`,
    JSON.stringify(users, null, 2)
  )
}

const getMatchup = (id, path, comparePath) => {
  const fileName = `${path}/${id}.json`
  if (fs.existsSync(fileName)) {
    return JSON.parse(fs.readFileSync(fileName))
  }
  const compareFileName = `${comparePath}/${id}.json`
  if (fs.existsSync(compareFileName)) {
    return JSON.parse(fs.readFileSync(compareFileName))
  }
}

export function getRatingsForCompareMatchup(run, model) {
  const runPath = pathForRun(run)
  const compareMatchups = JSON.parse(
    fs.readFileSync(`${runPath}/compareMatchups.json`)
  )
  const matchups = JSON.parse(fs.readFileSync(`${runPath}/matchups.json`))
  const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))
  const compareUsers = JSON.parse(
    fs.readFileSync(`${runPath}/compareUsers.json`)
  )

  for (let user of compareUsers) {
    user.score = 0
  }

  for (let matchup of compareMatchups) {
    const fileName = `${run.comparePath}/${run.compareModel}/${matchup.id}.json`

    if (!fs.existsSync(fileName)) {
      continue
    }

    const user1 = compareUsers.find((u) => u.id === matchup.text1)
    const user2 = compareUsers.find((u) => u.id === matchup.text2)
    const gradeResponse = JSON.parse(fs.readFileSync(fileName))
    const extractedText = extractWinner(gradeResponse)
    if (extractedText === null) {
      continue
    }
    const user1Won = extractedText == 'text1'
    matchup.winner = user1Won ? user1.id : user2.id
    const winner = user1Won ? user1 : user2
    const loser = user1Won ? user2 : user1
    winner.score++
    winner.wins++
    loser.losses++
  }

  const regression = regressionForUsers(compareUsers)

  let allUsers = users.concat(compareUsers)
  for (let user of allUsers) {
    user.score = 0
  }

  for (let i = 0; i < users.length; i++) {
    const matchupsWithUser = matchups.filter(
      (m) => m.text1 === users[i].id || m.text2 === users[i].id
    )
    // console.log(matchupsWithUser.length)
    const matchupsForCompareUser = compareMatchups.concat(matchupsWithUser)
    // console.log(matchupsWithUser.length, matchupsForCompareUser.length)
    for (let matchup of matchupsForCompareUser) {
      const gradeResponse = getMatchup(
        matchup.id,
        `${runPath}/${model}`,
        `${run.comparePath}/${run.compareModel}`
      )

      if (!gradeResponse) {
        continue
      }

      const user1 = allUsers.find((u) => u.id === matchup.text1)
      const user2 = allUsers.find((u) => u.id === matchup.text2)
      const extractedText = extractWinner(gradeResponse)

      if (extractedText === null) {
        continue
      }
      const user1Won = extractedText == 'text1'
      matchup.winner = user1Won ? user1.id : user2.id

      const winner = user1Won ? user1 : user2
      const loser = user1Won ? user2 : user1

      winner.score++
      winner.wins++
      loser.losses++
    }
  }

  // take out original users
  console.log(users)
  for (let user of users) {
    const guessedGrade = Math.round(regression.predict(user.score))
    user.guessedGrade = guessedGrade
    user.error = Math.abs(user.avgGrade - guessedGrade)
  }
  console.log(
    users.map(
      (u) =>
        `user: G:${u.avgGrade}, score: ${u.score}, ${u.guessedGrade}. error: ${u.error}`
    )
  )

  const averageError =
    users.reduce((acc, curr) => acc + curr.error, 0) / users.length
  console.log('averageError', averageError)
  console.log('RATINGS DONE')
}
