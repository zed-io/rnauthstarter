import {useDispatch} from 'react-redux';
import {AUTH0_PASSWORDLESS_AUDIENCE} from '../config';
import {setAccessToken} from './actions';
import {auth0} from './init';

export const useAuth0 = () => {
  const dispatch = useDispatch();
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
    try {
      const access = await auth0.auth.loginWithSMS({
        phoneNumber,
        code,
        audience: AUTH0_PASSWORDLESS_AUDIENCE,
      });
      dispatch(setAccessToken(access));
    } catch (error) {
      console.error('Unable to get access token', error);
    }
  };

  return {auth0, sendText: start, verifyText: finish};
};
