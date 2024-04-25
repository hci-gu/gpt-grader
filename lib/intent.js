import fs from 'fs'
import { getGradeInstruction } from './prompt.js'
import { getClient } from './client.js'

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

  let textResponse = response.choices[0].message.content
  // lowercase and trim the response
  textResponse = textResponse.toLowerCase().replace(/ /g, '')

  return textResponse === 'text1'
}

export async function getIntentOfMatchups(runName, model) {
  const runPath = `./data/runs/${runName}`
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
