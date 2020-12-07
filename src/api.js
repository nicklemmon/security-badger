const axios = require('axios')
const {
  GITHUB_API_URL,
  GITHUB_REPOSITORY,
  GITHUB_TOKEN,
  SLACK_CHANNEL,
  SLACK_WEBHOOK_URL,
} = require('./constants.js')

function getSecurityVulnerabilities() {
  const repoArr = GITHUB_REPOSITORY.split('/')
  const owner = repoArr[0].toLowerCase()
  const name = repoArr[1].toLowerCase()
  const query = `query {
    repository(owner: "${owner}", name: "${name}") {
      vulnerabilityAlerts(first: 99) {
        edges {
          node {
            securityAdvisory {
              permalink
              summary
              severity
              publishedAt
              vulnerabilities(first: 99) {
              	edges {
                  node {
                    package {
                      name
                    }
                    vulnerableVersionRange
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
  console.log(query)

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

function postSlackMsg({ text, blocks } = {}) {
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

module.exports = {
  getSecurityVulnerabilities,
  postSlackMsg,
}
