import { getSecurityVulnerabilities } from './api.js'
import { formatVulnerabilityAlerts } from './helpers.js'

async function start() {
  const { data } = await getSecurityVulnerabilities()
  const vulnerabilityAlerts = formatVulnerabilityAlerts(data)

  console.log('vulnerabilityAlerts', vulnerabilityAlerts)
}

start()
