import fs from 'fs'
import { getGradeInstruction } from './prompt.js'
import { getClient } from './client.js'
import { pathForRun } from './utils.js'

export async function getIntentOfMessage(message, model = 'local') {
  let start = new Date()
  const { getCompletion } = getClient(model)
  const response = await getCompletion(getGradeInstruction, message, [], {
    max_tokens: 10,
    temperature: 0.45,
  })

  return {
    ...response,
    duration: (new Date() - start) / 1000,
  }
}

export async function getNumericGradeOfMessage(message, model = 'local') {
  let start = new Date()
  const { getCompletion } = getClient(model)
  const response = await getCompletion(getGradeInstruction, message, [], {
    max_tokens: 10,
    temperature: 0.45,
  })

  return {
    ...response,
    duration: (new Date() - start) / 1000,
  }
}

export async function getIntentOfMatchups(run, model) {
  const runPath = pathForRun(run)
  const modelPath = `${runPath}/${model}`
  const path = `${modelPath}/intents`

  fs.mkdirSync(path, { recursive: true })

  const matchups = JSON.parse(fs.readFileSync(`${runPath}/matchups.json`))

  for (let i = 0; i < matchups.length; i++) {
    const matchup = matchups[i]
    const fileName = `${path}/${matchup.id}.json`

    if (fs.existsSync(fileName)) {
      continue
    }

    const matchupResponse = JSON.parse(
      fs.readFileSync(`${modelPath}/${matchup.id}.json`)
    )

    const response = await getIntentOfMessage(
      matchupResponse.choices[0].message.content,
      model
    )

    fs.writeFileSync(fileName, JSON.stringify(response, null, 2))
  }
}

export async function getNumericValueOfGrades(run, model) {
  const runPath = pathForRun(run)
  const modelPath = `${runPath}/${model}`
  const path = `${modelPath}/intents`

  const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))

  const values = []
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const fileName = `${path}/${user.id}.json`

    if (!fs.existsSync(fileName)) {
      continue
    }

    const gradeResponse = JSON.parse(
      fs.readFileSync(`${modelPath}/${user.id}.json`)
    )
    const intentText = intentResponse.choices[0].message.content
      .toLowerCase()
      .replace(/ /g, '')

    const value = intentText === 'text1' ? 1 : 0
    values.push(value)
  }

  return values
}
