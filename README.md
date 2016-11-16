# BitBucket branch delete action handler
This service handles post messages created by Atlassian's [Post-Receive WebHooks](https://confluence.atlassian.com/bitbucketserver/post-service-webhook-for-bitbucket-server-776640367.html) plugin for BitBucket.
It only checks the branch delete action and tries to delete the matching project in SonarQube.

## Configuration
It is placed in the `config.json` file, like below.
```
{
    "env": "dev",
    "port": 3000,
    "logDestination": "screen",
    "allowedHost": "localhost",
    "sonarApiBaseUrl": "http://sonar.boldchat.io/api",
    "bitBucketProjectList": [
      {
        "name": "SmartDesk",
        "repositoryMap": [
          {
            "bitBucket": "test-repo",
            "sonarProjectName": "TestRepo",
            "sonarProjectKey": "my:repo"
          }
        ]
      }
    ]
  }
```

The `port` is where the service listens for HTTP requests.
Logging is color formatted when `logDestination` is set to `screen` and is plain when set to `file`. Default is `screen`.
The calls are only accepted from a specific host, that is determined by reverse DNS lookup of the caller IP. The client hostname restricted to `allowedHost`.
The mapping `bitBucketProjectList` maps the BitBucket projects and the repositories inside it to Sonar project names and keys.

## Credentials
A separate file `credential.json` needs to be placed to the root of this project.
```
{
  "sonarCredentials": "<PLACE BASIC AUTHORIZATION HEADER HERE>"
}
```
It is the base64 encoded user:password pair used for HTTP authentication.

## Logging
This service provides logging for three severities. Only Errors needs to be monitored and taken care of.
Log is written to the standard output only.
