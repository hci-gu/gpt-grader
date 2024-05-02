import dotenv from 'dotenv'
dotenv.config()
import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import {
  exampleMessages,
  exampleMessagesGradingInstruction,
  exampleMessagesNumericalEng,
  exampleMessagesNumericalEngWithSwedishResponse,
  exampleMessagesNumericalGradeSWE,
  exampleMessagesShortAnswer,
  getGradeInstruction,
  gradingInstructionSWE,
  gradingInstructionSWEShorter,
  gradingInstructionSimple,
  gradingInstructionSimpleNumerical,
  gradingInstructionsEng,
} from './lib/prompt.js'
import { getClient } from './lib/client.js'
import { readData } from './lib/readData.js'
import { calculateRating, getRatingsForMatchups } from './lib/rating.js'
import { extractGrade, grade, gradeMatchups, gradeRun } from './lib/grade.js'
import { getIntentOfMatchups } from './lib/intent.js'
import { pathForRun } from './lib/utils.js'

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

async function createRun(
  name,
  numUsers,
  type,
  prompt,
  exampleMessages = [],
  settings = {}
) {
  const users = await readData(numUsers)

  const path = `./data/runs/${type}/${name}`
  fs.mkdirSync(path, { recursive: true })
  if (!fs.existsSync(`${path}/users.json`)) {
    fs.writeFileSync(`${path}/users.json`, JSON.stringify(users, null, 2))
  }
  if (!fs.existsSync(`${path}/prompt.txt`)) {
    fs.writeFileSync(`${path}/prompt.txt`, prompt)
  }
  if (!fs.existsSync(`${path}/settings.json`)) {
    fs.writeFileSync(`${path}/settings.json`, JSON.stringify(settings, null, 2))
  }
  if (!fs.existsSync(`${path}/exampleMessages.json`)) {
    fs.writeFileSync(
      `${path}/exampleMessages.json`,
      JSON.stringify(exampleMessages, null, 2)
    )
  }

  if (type === 'matchup') {
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
      fs.writeFileSync(
        `${path}/matchups.json`,
        JSON.stringify(matchups, null, 2)
      )
    }
  }

  return { name, type, users, path }
}

async function evaluateRun(run) {
  const runPath = pathForRun(run)
  // get all folders in the runPath
  const models = fs
    .readdirSync(runPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

  const evalutation = {}

  if (run.type === 'matchup') {
    for (let i = 0; i < models.length; i++) {
      const model = models[i]

      const users = JSON.parse(
        fs.readFileSync(`${runPath}/${model}/users.json`)
      )
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
        variance,
        stdDev,
      }
    }
  } else {
    for (let model of models) {
      const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))

      for (let user of users) {
        const fileName = `${runPath}/${model}/${user.id}.json`
        const response = JSON.parse(fs.readFileSync(fileName))
        user.textResponse = response.choices[0].message.content
        user.grade = extractGrade(response)
        user.error = Math.abs(user.avgGrade - user.grade)
      }

      const averageError =
        users.reduce((acc, curr) => acc + curr.error, 0) / users.length
      const variance =
        users.reduce(
          (acc, curr) => acc + Math.pow(curr.error - averageError, 2),
          0
        ) / users.length

      evalutation[model] = {
        users: users.map((u) => ({
          id: u.id,
          grade: u.grade,
          avgGrade: u.avgGrade,
          error: u.error,
          textResponse: u.textResponse,
        })),
        averageError:
          users.reduce((acc, curr) => acc + curr.error, 0) / users.length,
        variance,
      }
    }
  }

  fs.writeFileSync(
    `${runPath}/evaluation.json`,
    JSON.stringify(evalutation, null, 2)
  )
}

const fixErrors = async (run) => {
  const path = `./data/runs/${run.type}/${run.name}`

  const users = JSON.parse(fs.readFileSync(`${path}/users.json`))
  // list directiores in the run path
  const models = fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
  console.log(models)

  for (let model of models) {
    for (let user of users) {
      const fileName = `${path}/${model}/${user.id}.json`
      const response = JSON.parse(fs.readFileSync(fileName))
      const _grade = extractGrade(response)
      if (typeof _grade !== 'number' || isNaN(_grade)) {
        console.log('fix this one', user.id)
        const response = await grade(
          user.text,
          fs.readFileSync(`${path}/prompt.txt`, 'utf8'),
          model
        )
        const _newGrade = extractGrade(response)
        if (typeof _newGrade !== 'number' || isNaN(_newGrade)) {
          console.log('still not a number', user.id)
        } else {
          console.log('overwrite', user.id)
          fs.writeFileSync(fileName, JSON.stringify(response, null, 2))
        }
      }
    }
  }
}

const runAndEvaluate = async (run, model, runs = 3) => {
  for (let i = 0; i < runs; i++) {
    const modelRunName = `${model}_${i + 1}`
    if (run.type === 'matchup') {
      await gradeMatchups(run, modelRunName)
      await getIntentOfMatchups(run, modelRunName)
      await getRatingsForMatchups(run, modelRunName)
    } else {
      await gradeRun(run, modelRunName)
    }
  }

  await evaluateRun(run)
}

async function main() {
  const run = await createRun(
    `swedish-text-run-with-25-users-swedish-instruction-temp-0.7`,
    25,
    'simple',
    `
  You are a teacher grading essays, you will be given an essay and you have to grade it on a scale from 0 to 5.
  ## Always end your response with a grade from 0 to 5.

  ${gradingInstructionSWEShorter}`,
    exampleMessagesNumericalEngWithSwedishResponse,
    { temperature: 0.7 }
  )

  await runAndEvaluate(run, 'azure-gpt-4-turbo', 3)
  await fixErrors(run)
}

main()
