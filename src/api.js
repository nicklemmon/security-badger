import axios from 'axios'
import {
  GITHUB_API_URL,
  GITHUB_ORGANIZATION,
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  SLACK_CHANNEL,
  SLACK_WEBHOOK_URL,
} from './constants.js'

export function getSecurityVulnerabilities() {
  const query = `query {
    repository(owner: "${GITHUB_ORGANIZATION}", name: "${GITHUB_REPOSITORY}") {
      vulnerabilityAlerts(first: 99) {
        edges {
          node {
            securityAdvisory {
              permalink
              summary
              updatedAt
              publishedAt
              vulnerabilities {
                totalCount
              }
            }
          }
        }
      }
    }
  }`

  return axios({
    url: GITHUB_API_URL,
    method: 'POST',
    data: { query },
    headers: {
      Authorization: `bearer ${GITHUB_TOKEN}`,
    },
  })
    .then(({ data }) => data)
    .catch(err => console.log(err))
}

export function postSlackMsg({ text, blocks } = {}) {
  if (!SLACK_WEBHOOK_URL)
    throw new Error('No SLACK_WEBHOOK_URL supplied - messages cannot be posted.')

  if (!SLACK_CHANNEL) throw new Error('No slackChannel supplied - messages cannot be posted.')

  return axios({
    method: 'POST',
    url: SLACK_WEBHOOK_URL,
    data: {
      channel: SLACK_CHANNEL,
      username: 'Security Badger',
      text,
      blocks,
    },
  }).catch(err => console.log(err))
}