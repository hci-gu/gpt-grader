import fs from 'fs'
import {
  gradingInstructionSWE,
  gradingInstructionSWEShorter,
} from './prompt.js'
import { getClient } from './client.js'

export async function grade(text1, text2, client = 'local') {
  let start = new Date()
  const { getCompletion } = getClient(client)

  const systemPrompt = `
      You are a teacher grading a student's writing assignment. Messages you receive will contain two texts, your job is to say which of the texts is better."
  
      The following are your instructions for grading the student's writing assignment:
      ${gradingInstructionSWEShorter}
      `
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
  //   requests.push({
  //     type: 'grade',
  //     usage: response.usage,
  //     duration: durationInSeconds,
  //   })
  //   saveStats()
}

export async function gradeMatchups(runName, model) {
  const runPath = `./data/runs/${runName}`
  const path = `${runPath}/${model}`

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

    const response = await grade(user1.text, user2.text, model)

    fs.writeFileSync(fileName, JSON.stringify(response, null, 2))
  }
}
