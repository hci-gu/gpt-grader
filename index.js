import dotenv from 'dotenv'
dotenv.config()
import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import {
  exampleMessages,
  exampleMessagesGradingInstruction,
  getGradeInstruction,
  gradingInstructionSWE,
  gradingInstructionSWEShorter,
} from './lib/prompt.js'
import { getClient } from './lib/client.js'
import { readData } from './lib/readData.js'
import { calculateRating, getRatingsForMatchups } from './lib/rating.js'
import { grade, gradeMatchups } from './lib/grade.js'
import { getIntentOfMatchups } from './lib/intent.js'

// function saveStats() {
//   const intentReqs = requests.filter((s) => s.type === 'intent')
//   const averageDurationIntent =
//     intentReqs.reduce((acc, curr) => acc + curr.duration, 0) / intentReqs.length
//   const gradeReqs = requests.filter((s) => s.type === 'grade')
//   const averageDurationGrade =
//     gradeReqs.reduce((acc, curr) => acc + curr.duration, 0) / gradeReqs.length
//   fs.writeFileSync(
//     'stats.json',
//     JSON.stringify(
//       {
//         requests,
//         averageDurationIntent,
//         averageDurationGrade,
//       },
//       null,
//       2
//     )
//   )
// }

// let runs = 0
// let requests = []

async function createRun(name, numUsers = 25) {
  const users = await readData(numUsers)

  const path = `./data/runs/${name}`
  fs.mkdirSync(path, { recursive: true })
  if (!fs.existsSync(`${path}/users.json`)) {
    fs.writeFileSync(`${path}/users.json`, JSON.stringify(users, null, 2))
  }

  let matchups = []
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const user1 = users[i]
      const user2 = users[j]

      matchups.push({
        id: uuid(),
        users: [user1.id, user2.id],
      })
    }
  }
  if (!fs.existsSync(`${path}/matchups.json`)) {
    fs.writeFileSync(`${path}/matchups.json`, JSON.stringify(matchups, null, 2))
  }

  return { name, users, path }
}

async function evaluateRun(runName) {
  const runPath = `./data/runs/${runName}`
  // get all folders in the runPath
  const models = fs
    .readdirSync(runPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const evalutation = {}

  for (let i = 0; i < models.length; i++) {
    const model = models[i]

    const users = JSON.parse(fs.readFileSync(`${runPath}/${model}/users.json`))
    // sort users by rating
    users.sort((a, b) => a.rating - b.rating)
    // remap to new grade (from 0 to 5 ) based on number of users and their rating
    users.forEach((user, index) => {
      user.grade = (index / users.length) * 5
      user.error = Math.abs(user.avgGrade - user.grade)
    })

    const averageError =
      users.reduce((acc, curr) => acc + curr.error, 0) / users.length

    evalutation[model] = {
      users: users.map((u) => ({
        id: u.id,
        rating: u.rating,
        grade: u.grade,
        avgGrade: u.avgGrade,
        error: u.error,
      })),
      averageError,
    }
  }

  fs.writeFileSync(
    `${runPath}/evaluation.json`,
    JSON.stringify(evalutation, null, 2)
  )
}

async function main() {
  const run = await createRun('run-with-25-users')

  await gradeMatchups(run.name, 'phi-3-7b')

  await getIntentOfMatchups(run.name, 'phi-3-7b')

  await getRatingsForMatchups(run.name, 'phi-3-7b')

  await evaluateRun(run.name)
}

main()
