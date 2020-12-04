// TODO: can't this be done within the GraphQL query itself?
// This is really fugly as a result...
function formatVulnerabilityAlerts(data) {
  const { repository } = data

  if (!repository) return console.log('No repository found')

  const { vulnerabilityAlerts } = repository

  if (!vulnerabilityAlerts) return console.log('No vulnerability alerts found')

  const { edges } = vulnerabilityAlerts

  return edges.map(edge => {
    const advisory = edge.node.securityAdvisory
    const { vulnerabilities, ...rest } = advisory
    const firstVulnerabilityNode = vulnerabilities.edges[0].node
    const vulnerableVersionRange = firstVulnerabilityNode.vulnerableVersionRange

    return {
      ...rest,
      versionRange: vulnerableVersionRange,
    }
  })
}

module.exports = {
  formatVulnerabilityAlerts,
}
