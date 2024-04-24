import { gradingInstructionSWE, gradingInstructionSWEShorter } from '../prompt'
import { getClient } from './client'

export async function getBetterText(text1, text2) {
  //   let start = new Date()
  const { getCompletion } = getClient('local')

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
  fs.writeFileSync(
    `./data/run_${runs}_grade.json`,
    JSON.stringify(response, null, 2)
  )

  //   const durationInSeconds = (new Date() - start) / 1000
  //   requests.push({
  //     type: 'grade',
  //     usage: response.usage,
  //     duration: durationInSeconds,
  //   })
  //   saveStats()
}
