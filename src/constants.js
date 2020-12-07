const GITHUB_API_URL = 'https://api.github.com/graphql'
const GITHUB_REPOSITORY = process.env.GITHUB_REPO
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL
const SLACK_CHANNEL = process.env.SLACK_CHANNEL || process.env.INPUT_SLACKCHANNEL

module.exports = {
  GITHUB_API_URL,
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  SLACK_WEBHOOK_URL,
  SLACK_CHANNEL,
}
