import { Module } from 'vuex';
import { SettingsIDEState, RootState } from '@/types/state';
import getters from './getters';

const state: SettingsIDEState = {
  settings: {
    language:'javascript'
  },
  error: null,
};

export default {
  namespaced: true,
  state,
  getters,
} as Module<SettingsIDEState, RootState>