import Vue from 'vue';
import Vuex from 'vuex';
import { RootState, AuthState, IDEState } from '@/types/state';
import auth from '@/modules/login/_store/module';
import ide from '@/modules/editor/_store/module';

interface State extends RootState {
  auth: AuthState;
  ide: IDEState;
}

Vue.use(Vuex);

export default new Vuex.Store<State>({
  modules: {
    auth,
    ide,
  },
});
