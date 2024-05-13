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
import {
  calculateRating,
  getRatingsForCompareMatchup,
  getRatingsForMatchups,
} from './lib/rating.js'
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
  settings = {},
  compareWith = null,
  compareModel = null
) {
  const users = await readData(numUsers)

  const path = `./data/runs/${type}/${name}`
  const comparePath = `./data/runs/matchup/${compareWith}`
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
        const text1User = Math.random() > 0.5 ? user1 : user2
        const text2User = text1User === user1 ? user2 : user1

        matchups.push({
          id: uuid(),
          text1: text1User.id,
          text2: text2User.id,
        })
      }
    }
    if (!fs.existsSync(`${path}/matchups.json`)) {
      fs.writeFileSync(
        `${path}/matchups.json`,
        JSON.stringify(matchups, null, 2)
      )
    }
  } else if (type === 'compare') {
    fs.cpSync(`${comparePath}/matchups.json`, `${path}/compareMatchups.json`)
    const compareUsers = JSON.parse(
      fs.readFileSync(`${comparePath}/users.json`, 'utf8')
    )
    if (!fs.existsSync(`${path}/compareUsers.json`)) {
      fs.writeFileSync(
        `${path}/compareUsers.json`,
        JSON.stringify(compareUsers, null, 2)
      )
    }

    let matchups = []
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < compareUsers.length; j++) {
        const user1 = users[i]
        const user2 = compareUsers[j]
        const text1User = Math.random() > 0.5 ? user1 : user2
        const text2User = text1User === user1 ? user2 : user1
        matchups.push({
          id: uuid(),
          text1: text1User.id,
          text2: text2User.id,
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

  return { name, type, users, path, comparePath, compareModel }
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

      const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))
      // sort users by rating
      users.sort((a, b) => a.rating - b.rating)

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
        user.compareError = Math.abs(user.grades[0] - user.grades[1])
      }

      const averageError =
        users.reduce((acc, curr) => acc + curr.error, 0) / users.length
      const variance =
        users.reduce(
          (acc, curr) => acc + Math.pow(curr.error - averageError, 2),
          0
        ) / users.length

      const averageCompareError =
        users.reduce((acc, curr) => acc + curr.compareError, 0) / users.length
      const varianceCompare =
        users.reduce(
          (acc, curr) =>
            acc + Math.pow(curr.compareError - averageCompareError, 2),
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
        averageCompareError,
        varianceCompare,
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
  if (run.type === 'matchup' || run.type === 'compare') {
    await gradeMatchups(run, model)
    if (run.type === 'matchup') {
      await getRatingsForMatchups(run, model)
    } else {
      await getRatingsForCompareMatchup(run, model)
    }
  } else {
    for (let i = 0; i < runs; i++) {
      const modelRunName = `${model}_${i + 1}`
      await gradeRun(run, modelRunName)
    }
  }

  // await evaluateRun(run)
}

async function main() {
  const run = await createRun(
    `compare-run-with-25-users-swedish-instruction-temp-0.7`,
    25,
    'compare',
    `
You are a teacher grading essays, you will be given two essays and your job is to decide which is better based on a grading criteria.
## Always end your response with which text you think is better, "decision: Text X".

  ${gradingInstructionSWEShorter}`,
    exampleMessages,
    { temperature: 0.7 },
    'run-with-150-users-swedish-instruction-temp-0.7',
    'llama3-70b'
  )

  await runAndEvaluate(run, 'compare-debugger', 3)
  // await fixErrors(run)
}

main()
