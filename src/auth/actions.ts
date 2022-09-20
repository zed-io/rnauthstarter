export enum Actions {
  FIREBASE_AUTHORIZED = 'FIREBASE/AUTHORIZED',
  AUTH0_AUTHORIZED = 'AUTH0/AUTHORIZED',
}

export interface FirebaseAuthorizedAction {
  type: Actions.FIREBASE_AUTHORIZED;
}

export const firebaseAuthorized = (): FirebaseAuthorizedAction => ({
  type: Actions.FIREBASE_AUTHORIZED,
});

export interface Auth0AuthorizedAction {
  type: Actions.AUTH0_AUTHORIZED;
}

export const Auth0Authorized = (): Auth0AuthorizedAction => ({
  type: Actions.AUTH0_AUTHORIZED,
});

export type ActionTypes = FirebaseAuthorizedAction | Auth0AuthorizedAction;
