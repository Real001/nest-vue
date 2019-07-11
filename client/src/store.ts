import Vue from 'vue';
import Vuex from 'vuex';
import { RootState, AuthState } from '@/types/state';
import auth from '@/modules/login/_store/module';

interface State extends RootState {
  auth: AuthState;
}

Vue.use(Vuex);

export default new Vuex.Store<State>({
  modules: {
    auth,
  },
});
