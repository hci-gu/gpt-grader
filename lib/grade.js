import fs from 'fs'
import { getClient } from './client.js'
import { pathForRun } from './utils.js'

export async function grade(
  text,
  systemPrompt,
  exampleMessages = [],
  settings = {},
  client = 'local',
  attempts = 3
) {
  let start = new Date()
  const { getCompletion } = getClient(client)

  const response = await getCompletion(
    systemPrompt,
    text,
    exampleMessages,
    settings
  )
  const durationInSeconds = (new Date() - start) / 1000
  const _grade = extractGrade(response)
  console.log(_grade)
  if ((typeof _grade !== 'number' || isNaN(_grade)) && attempts > 0) {
    console.log('failed instructions try again')
    return grade(
      text,
      systemPrompt,
      exampleMessages,
      settings,
      client,
      attempts - 1
    )
  }

  return {
    ...response,
    duration: durationInSeconds,
  }
}
export function extractGrade(response) {
  const textResponse = response.choices[0].message.content
  const lastPart = textResponse.slice(-10)
  const numbers = lastPart.match(/\d+/g)
  return parseInt(numbers)
}

export async function gradeMatchup(
  text1,
  text2,
  systemPrompt,
  client = 'local'
) {
  let start = new Date()
  const { getCompletion } = getClient(client)

  const userPrompt = `
      Text1: ${text1}
      
      Text2: ${text2}
  
      Which text is better?
      `

  const response = await getCompletion(systemPrompt, userPrompt)
  const durationInSeconds = (new Date() - start) / 1000

  return {
    ...response,
    duration: durationInSeconds,
  }
}

export async function gradeMatchups(run, model) {
  const runPath = pathForRun(run)
  const path = `${runPath}/${model}`
  const systemPrompt = fs.readFileSync(`${runPath}/prompt.txt`, 'utf8')

  fs.mkdirSync(path, { recursive: true })

  const matchups = JSON.parse(fs.readFileSync(`${runPath}/matchups.json`))
  const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))

  for (let i = 0; i < matchups.length; i++) {
    const matchup = matchups[i]
    const fileName = `${path}/${matchup.id}.json`

    if (fs.existsSync(fileName)) {
      continue
    }

    const user1 = users.find((u) => u.id === matchup.users[0])
    const user2 = users.find((u) => u.id === matchup.users[1])

    const response = await gradeMatchup(
      user1.text,
      user2.text,
      systemPrompt,
      model
    )

    fs.writeFileSync(fileName, JSON.stringify(response, null, 2))
  }
}

export async function gradeRun(run, model) {
  const runPath = pathForRun(run)
  const path = `${runPath}/${model}`
  const systemPrompt = fs.readFileSync(`${runPath}/prompt.txt`, 'utf8')
  const exampleMessages = JSON.parse(
    fs.readFileSync(`${runPath}/exampleMessages.json`, 'utf8')
  )
  const settings = JSON.parse(
    fs.readFileSync(`${runPath}/settings.json`, 'utf8')
  )

  fs.mkdirSync(path, { recursive: true })

  const users = JSON.parse(fs.readFileSync(`${runPath}/users.json`))

  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    const fileName = `${path}/${user.id}.json`

    if (fs.existsSync(fileName)) {
      continue
    }

    const response = await grade(
      user.text,
      systemPrompt,
      exampleMessages,
      settings,
      model
    )

    fs.writeFileSync(fileName, JSON.stringify(response, null, 2))
  }
}
