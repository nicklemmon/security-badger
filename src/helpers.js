export function formatVulnerabilityAlerts(data) {
  const {
    repository: {
      vulnerabilityAlerts: { edges },
    },
  } = data

  return edges.map(edge => edge.node.securityAdvisory)
}
