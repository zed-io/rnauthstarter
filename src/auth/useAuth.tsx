import {auth0} from './init';

export const useAuth0 = () => {
  const start = async (phoneNumber: string) => {
    if (!phoneNumber) {
      return;
    }
    return await auth0.auth.passwordlessWithSMS({phoneNumber});
  };

  const finish = async (phoneNumber: string, code: string) => {
    if (!phoneNumber) {
      return;
    }
    return await auth0.auth.loginWithSMS({phoneNumber, code});
  };

  return {auth0, sendText: start, verifyText: finish};
};
