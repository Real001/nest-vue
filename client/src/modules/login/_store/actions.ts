import { ActionTree } from 'vuex';
import cookie from 'js-cookie';
import { loadMe, login, logout } from '@/modules/login/_services/loginService';
import { RootState, AuthState } from '@/types/state';
import { executeSafe } from '@/helpers/store-helpers';
import { LoginData } from '@/types/models';
import {
  USER_LOADING_SUCCESS,
  USER_LOADING_START,
  USER_LOADING_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_START,
} from './mutations';

export default {
  async loadUser({ commit }) {
    return executeSafe({
      commit,
      mutations: {
        start: USER_LOADING_START,
        success: USER_LOADING_SUCCESS,
        fail: USER_LOADING_FAILED,
      },
      action: loadMe,
    });
  },
  async login({ commit, dispatch, state }, data: LoginData) {
    return await executeSafe({
      commit,
      mutations: {
        start: LOGIN_START,
        success: LOGIN_SUCCESS,
        fail: LOGIN_FAILED,
      },
      action: async () => {
        const response = (await login(data)) as any;
        if (response.access_token) {
          cookie.set('access_token', response.data.access_token, {
            expires: response.data.expires_in / 60 / 60 / 24,
          });
        }

        if (state.loginError === null) {
          await dispatch('loadUser');
        }
      },
    });
  },
  async logout({ commit }) {
    await executeSafe({
      commit,
      mutations: { start: LOGOUT_START },
      action: logout,
    });
  },
} as ActionTree<AuthState, RootState>;
