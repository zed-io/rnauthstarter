# rnauthstarter

This app uses Auth0, and Hasura.

## Connecting Hasura

Following [this guide](https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/) to connect the app to Hasura with Authentication.

N.B. This app uses Auth0 instead of Firebase, and sections below will highlight differences in the steps above.

### Authentication
From the guide:
> Since we will use  JWT from Firebase, set HASURA_GRAPHQL_JWT_SECRET

Instead of using Firebase, we use Auth0. To connect Auth0 as the authentication provider for the Hasura instance, see [this document](https://hasura.io/docs/latest/auth/authentication/jwt/#auth0-issues), and continue after the above instruction.