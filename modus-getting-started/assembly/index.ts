import { http, models } from "@hypermode/modus-sdk-as"
import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat"

/**
 * Generate text from a LLM model
 */
export function generateText(instruction: string, prompt: string): string {
  const model = models.getModel<OpenAIChatModel>("text-generator")

  const input = model.createInput([new SystemMessage(instruction), new UserMessage(prompt)])

  input.temperature = 0.7
  const output = model.invoke(input)

  return output.choices[0].message.content.trim()
}

/**
 * A single quote from the Zenquotes API
 */
@json
class Quote {

  @alias("q")
  quote!: string


  @alias("a")
  author!: string
}

/**
 * Fetch random quote from the Zenquotes API
 */
export function getRandomQuote(): Quote {
  const request = new http.Request("https://zenquotes.io/api/random")

  const response = http.fetch(request)
  if (!response.ok) {
    throw new Error(`Failed to fetch quote. Received: ${response.status} ${response.statusText}`)
  }

  return response.json<Quote[]>()[0]
}

/**
 * Basic Hello World example
 */
export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`
}
