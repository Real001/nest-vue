import { GetterTree, ModuleTree } from 'vuex';
import { RootState, AuthState } from '@/types/state';

export default {
  user({ user }) {
    return user;
  },
} as GetterTree<AuthState, RootState>;
