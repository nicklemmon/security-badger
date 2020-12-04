const { GITHUB_REPOSITORY } = require('./constants.js')
const { getSecurityVulnerabilities, postSlackMsg } = require('./api.js')
const { formatVulnerabilityAlerts } = require('./helpers.js')

function getIntroMsg(numberOfVulnerabilities) {
  if (numberOfVulnerabilities === 1)
    return `There is 1 security vulnerability that needs to be addressed for the repo *${GITHUB_REPOSITORY}*.`

  return `There are ${numberOfVulnerabilities} vulnerabilities that still need to be addressed for the repo *${GITHUB_REPOSITORY}*.`
}

async function start() {
  const { data } = await getSecurityVulnerabilities()
  const vulnerabilityAlerts = formatVulnerabilityAlerts(data)

  if (vulnerabilityAlerts.length > 0) {
    const introMsg = getIntroMsg(vulnerabilityAlerts.length)

    await postSlackMsg({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*A wild Security Badger appeared!* \n ${introMsg}`,
          },
        },
        ...[].concat(
          ...vulnerabilityAlerts.map(alert => {
            const { permalink, summary, severity, versionRange } = alert
            const summaryContent = permalink
              ? `*<${permalink}|:rotating_light: ${summary}>*`
              : `*:rotating_light: ${summary}*`
            const contextContent = versionRange
              ? `*${severity}* severity vulnerability within version range ${versionRange}.`
              : `*${severity}* vulnerability.`

            return [
              {
                type: 'divider',
              },
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: summaryContent,
                },
              },
              {
                type: 'context',
                elements: [
                  {
                    type: 'mrkdwn',
                    text: contextContent,
                  },
                ],
              },
            ]
          }),
        ),
      ],
    })
  }
}

start()
