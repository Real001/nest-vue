import { Module } from 'vuex';
import { RootState, AuthState } from '@/types/state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const state: AuthState = {
  isLoading: true,
  isExpired: false,
  error: null,
  user: null,
  loginError: null,
  loginInProgress: false,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
} as Module<AuthState, RootState>;
