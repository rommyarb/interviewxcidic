import axios from 'axios';
import { BASE_URL } from './api';
import qs from 'qs';
import { AuthResponse } from '../common/@types/type_auth';
import { auth_init_state, store_auth } from '../common/stores/store_auth';
import { navigation_ref } from '../common/navigation/navigation_ref';
import { CommonActions } from '@react-navigation/native';

export const apiLogin = (param: {
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  return axios
    .post(
      BASE_URL + '/api/collections/users/auth-with-password',
      qs.stringify({
        identity: param.username,
        password: param.password,
      }),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(res => res.data);
};

export const logout = () => {
  // reset state
  store_auth.record = { ...auth_init_state.record };
  store_auth.token = '';

  // replace into login page (Screen1)
  navigation_ref.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Screen1' }],
    }),
  );
};
