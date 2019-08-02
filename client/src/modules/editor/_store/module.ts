import { Module } from 'vuex';
import { IDEState, RootState } from '@/types/state';
import getters from './getters';
import mutations from './mutation';

const state: IDEState = {
  settings: {
    language: 'javascript',
  },
  error: null,
  code: [],
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
} as Module<IDEState, RootState>;
