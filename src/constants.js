export const GITHUB_API_URL = 'https://api.github.com/graphql'
export const GITHUB_ORGANIZATION = process.env.GITHUB_ORGANIZATION
export const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN
export const GITHUB_AUTH_HEADER = { Authorization: `${GITHUB_TOKEN}` }
export const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
export const SLACK_CHANNEL = process.env.SLACK_CHANNEL || process.env.INPUT_SLACKCHANNEL
