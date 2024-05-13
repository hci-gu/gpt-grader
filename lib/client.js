import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import axios from 'axios'

export const getClient = (model) => {
  const key = model.split('_')[0]
  let client
  console.log('key', key)
  switch (key) {
    case 'random':
      return {
        getCompletion: async (
          systemPrompt,
          userPrompt,
          messages = [],
          settingsOverride = {}
        ) => {
          return {
            choices: [
              {
                message: {
                  content: Math.random() > 0.9 ? 'text1' : 'text2',
                },
              },
            ],
          }
        },
      }
    case 'compare-debugger':
      return {
        getCompletion: async (systemPrompt, userPrompt, messages = []) => {
          console.log(userPrompt)
          // extract out text1 and text2
          const text1 = parseInt(
            userPrompt.split('Text1: ')[1].split('Text2: ')[0].trim()
          )
          const text2 = parseInt(
            userPrompt
              .split('Text2: ')[1]
              .split('Which text is better?')[0]
              .trim()
          )

          if (text1 > text2) {
            return {
              choices: [{ message: { content: 'text1' } }],
            }
          } else if (text2 > text1) {
            return {
              choices: [{ message: { content: 'text2' } }],
            }
          } else {
            return {
              choices: [{ message: { content: 'text1' } }],
            }
          }
        },
      }
    case 'matchup-debugger':
      return {
        getCompletion: async (systemPrompt, userPrompt, messages = []) => {
          console.log(userPrompt)
          // extract out text1 and text2
          const text1 = parseInt(
            userPrompt.split('Text1: ')[1].split('Text2: ')[0].trim()
          )
          const text2 = parseInt(
            userPrompt
              .split('Text2: ')[1]
              .split('Which text is better?')[0]
              .trim()
          )

          if (text1 > text2) {
            return {
              choices: [{ message: { content: 'text1' } }],
            }
          } else if (text2 > text1) {
            return {
              choices: [{ message: { content: 'text2' } }],
            }
          } else {
            return {
              choices: [{ message: { content: 'text1' } }],
            }
          }
        },
      }
    case 'azure-gpt-4-32k':
      console.log('azure-gpt-4-32k')
      client = new OpenAIClient(
        'https://gu-ai-008.openai.azure.com/',
        new AzureKeyCredential(process.env.AZURE_KEY)
      )
      return {
        client,
        getCompletion: (systemPrompt, userPrompt, messages = []) =>
          client.getChatCompletions('GU-AI-008', [
            {
              role: 'system',
              content: systemPrompt,
            },
            ...messages,
            {
              role: 'user',
              content: userPrompt,
            },
          ]),
      }
    case 'azure-gpt-4-turbo':
      console.log('azure-gpt-4-turbo')
      client = new OpenAIClient(
        'https://gu-ai-008.openai.azure.com/',
        new AzureKeyCredential(process.env.AZURE_KEY)
      )
      return {
        client,
        getCompletion: (systemPrompt, userPrompt, messages = []) =>
          client.getChatCompletions('GU-AI-GPT-4-Turbo', [
            {
              role: 'system',
              content: systemPrompt,
            },
            ...messages,
            {
              role: 'user',
              content: userPrompt,
            },
          ]),
      }
    case 'local':
    case 'llama-3':
    case 'llama-2-70b':
    case 'llama-3-70b':
    default:
      return {
        getCompletion: async (
          systemPrompt,
          userPrompt,
          messages = [],
          settingsOverride = {}
        ) => {
          const response = await axios.post(
            'http://localhost:1234/v1/chat/completions',
            {
              messages: [
                { role: 'system', content: systemPrompt },
                ...messages,
                { role: 'user', content: userPrompt },
              ],
              temperature: 0.5,
              max_tokens: -1,
              stream: false,
              ...settingsOverride,
            }
          )

          return response.data
        },
      }
      break
  }
}
