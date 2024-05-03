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
                  content: Math.random() > 0.5 ? 'text1' : 'text2',
                },
              },
            ],
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
