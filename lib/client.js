import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import axios from 'axios'

export const getClient = (key) => {
  switch (key) {
    case 'local':
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
              temperature: 0.7,
              max_tokens: -1,
              stream: false,
              ...settingsOverride,
            }
          )

          return response.data
        },
      }

    case 'azure-gpt-4-32k':
      const client = new OpenAIClient(
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
            {
              role: 'user',
              content: userPrompt,
            },
          ]),
      }
    default:
      break
  }
}