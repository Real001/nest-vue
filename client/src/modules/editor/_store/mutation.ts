import { MutationTree } from 'vuex';
import { LOADING_CODE, ERROR } from '@/constants/mutation-types';
import { IDEState } from '@/types/state';

export default {
  [LOADING_CODE](state, code: string) {
    state.code.push(code);
  },
  [ERROR](state, error) {
    state.error = error;
  },
} as MutationTree<IDEState>;
