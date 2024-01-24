import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthResponse } from '../@types/type_auth';
import { proxy, subscribe } from 'valtio';

export const KEY_STORE_AUTH = 'store_auth';

export const auth_init_state: AuthResponse = {
  record: {
    id: '',
    avatar: '',
    collectionId: '',
    collectionName: '',
    created: '',
    email: '',
    emailVisibility: false,
    name: '',
    updated: '',
    username: '',
    verified: false,
  },
  token: '',
};

export const store_auth = proxy<AuthResponse>(auth_init_state);

subscribe(store_auth, () => {
  AsyncStorage.setItem(KEY_STORE_AUTH, JSON.stringify(store_auth));
});
