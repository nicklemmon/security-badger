# Security Badger

Note, in order for this to work, be sure to have a token available with required permissions to
leverage the GitHub GraphQL API:
[Authenticating with GraphQL](https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql)

## Example Usage

```yml
name: Security Badger

on:
  schedule:
    # Every weekday every 2 hours during working hours, send notification
    - cron: '0 8-17/2 * * 1-5'

jobs:
  pr-reviews-reminder:
    runs-on: ubuntu-latest
    steps:
      uses: nicklemmon/security-badger@v0.0.13-alpha
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_API_TOKEN }}
        GITHUB_REPOSITORY: ${{ github.repository }}
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
      with:
        slackChannel: '#general'
```
