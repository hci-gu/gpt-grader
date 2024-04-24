import { getGradeInstruction } from '../prompt.js'
import { getClient } from './client.js'

export async function getIntentOfMessage(message) {
  let start = new Date()
  const { getCompletion } = getClient('local')
  const response = await getCompletion(getGradeInstruction, message, [], {
    max_tokens: 10,
    temperature: 0.45,
  })

  fs.writeFileSync(
    `./data/run_${runs}_intent.json`,
    JSON.stringify(response, null, 2)
  )

  let textResponse = response.choices[0].message.content
  // lowercase and trim the response
  textResponse = textResponse.toLowerCase().replace(/ /g, '')

  const durationInSeconds = (new Date() - start) / 1000
  requests.push({
    type: 'intent',
    usage: response.usage,
    duration: durationInSeconds,
  })
  saveStats()

  return textResponse === 'text1'
}
