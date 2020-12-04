// TODO: can't this be done within the GraphQL query itself?
function formatVulnerabilityAlerts(data) {
  const {
    repository: {
      vulnerabilityAlerts: { edges },
    },
  } = data

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
