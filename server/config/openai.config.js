require('dotenv').config()
const { OpenAI } = require('openai')

const token = process.env["GITHUB_TOKEN"]
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

// const client = new OpenAI({
//     apiKey: process.env.OPEN_API_KEY,
//     organization: process.env.OPEN_API_ORG_ID
// })

const client = new OpenAI({
    baseURL: endpoint,
    apiKey: token
})

module.exports = {
    client,
    modelName
}