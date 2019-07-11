import { MutationTree } from 'vuex';
import { AuthState } from '@/types/state';
import { User } from '@/types/models';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_START = 'LOGOUT_START';

export const USER_LOADING_START = 'USER_LOADING_START';
export const USER_LOADING_SUCCESS = 'USER_LOADING_SUCCESS';
export const USER_LOADING_FAILED = 'USER_LOADING_FAILED';
export const USER_EXPIRED = 'USER_EXPIRED';

export default {
  [LOGOUT_START](state) {
    state.isLoading = true;
    state.user = null;
  },
  [LOGIN_START](state) {
    state.loginInProgress = true;
    state.loginError = null;
  },
  [LOGIN_SUCCESS](state) {
    state.loginInProgress = false;
    state.loginError = null;
  },
  [LOGIN_FAILED](state, error: Error) {
    state.loginError = error;
    state.loginInProgress = false;
    console.log(error);
  },
  [USER_LOADING_START](state) {
    state.isLoading = true;
    state.user = null;
    state.error = null;
  },
  [USER_LOADING_SUCCESS](state, request: any) {
    state.user = request.data;
    state.isExpired = false;
    state.isLoading = false;
  },
  [USER_LOADING_FAILED](state, error: Error) {
    state.error = error;
    state.isExpired = false;
    state.isLoading = false;
    console.log(error);
  },
  [USER_EXPIRED](state) {
    state.isExpired = true;
    state.isLoading = false;
  },
} as MutationTree<AuthState>;
