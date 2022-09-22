# rnauthstarter

This app uses Auth0, and Hasura.

## Connecting Hasura

Following [this guide](https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/) to connect the app to Hasura with Authentication.

N.B. This app uses Auth0 instead of Firebase, and sections below will highlight differences in the steps from the document above.

### Authentication
From the guide:
> Since we will use  JWT from Firebase, set HASURA_GRAPHQL_JWT_SECRET

Instead of using Firebase, we use Auth0. To connect Auth0 as the authentication provider for the Hasura instance, see [this video](https://youtu.be/2cvXfOLEJag?t=1156), and continue after the above instruction.

Adding custom claims to Auth0, expected by Hasura:

> Auth0 will inject custom claims into the JWT received by an authneticated user.

In order for Hasura to determine the role based access level of the authorized user, custom claims are added to Auth0's authorization response. See [this link](https://hasura.io/docs/latest/guides/integrations/auth0-jwt/) 

> The above document from Hasura uses Rules in Auth0 which is deprecated, use Actions instead.

See [this link](https://auth0.com/docs/get-started/apis/scopes/sample-use-cases-scopes-and-claims) for how to add custom claims using Auth0 Actions.

Once the Hasura console has been updated with the `jwk_url`, and Auth0's authorization response returns Hasura's custom claim, the rest of the guide can be followed to configure role based access to various tables in the data store.

### Issues

>It was observed that the access token received from Auth0 was malformed, consisting of 3 segments instead of 5 segments.

 When logging in using a passwordless SMS verification, it may be required to enter the audience of the receiving API https://github.com/auth0/react-native-auth0/issues/349
