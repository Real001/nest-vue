<template>
  <v-app id="editor" dark>
    <ApolloQuery
      :query="require('./_graphql/querySettings.gql')"
      :variables="{ user: user._id }"
      :style="{ height: '100%' }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="amber"
        ></v-progress-circular>
        <v-alert v-else-if="error" :value="true" type="error">
          {{ error }}
        </v-alert>
        <!--TODO поправить отображение редактора-->
        <navigation-i-d-e :user="user" :config="data" :code="code" />
        <v-content class="editor-block">
          <v-container fluid fill-height>
            <v-layout>
              <ace-editor
                :mode="data.settings.lang"
                :theme="data.settings.theme"
                :splits="4"
                name="brace"
                :fontSize="14"
                :value="getCode[getCode.length - 1]"
                width="100%"
                height="100%"
                enableBasicAutocompletion
                enableLiveAutocompletion
              />
            </v-layout>
          </v-container>
        </v-content>
      </template>
    </ApolloQuery>
    <v-snackbar v-model="snackbar" color="red" top>
      {{ er }}
      <v-btn dark text @click="closeSnackbar">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Emit, Watch } from 'vue-property-decorator';
import { Getter, Mutation } from 'vuex-class';
import brace from 'brace';
import { Ace as AceEditor } from 'vue2-brace-editor';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { User } from '@/types/models';
import NavigationIDE from './_components/NavigationIDE.vue';
import { ERROR } from '@/constants/mutation-types';

@Component({ components: { NavigationIDE, AceEditor } })
export default class EditorPage extends Vue {
  @Getter('user', { namespace: 'auth' }) public user!: User;
  @Getter('error', { namespace: 'ide' }) public error!: string;
  @Getter('getCode', { namespace: 'ide' }) public getCode!: string[];

  @Mutation(ERROR, { namespace: 'ide' })
  public mutationError!: (error: null) => void;

  private snackbar: boolean = false;

  @Emit()
  private closeSnackbar() {
    this.snackbar = false;
    this.mutationError(null);
  }

  public get er() {
    if (this.error) {
      this.snackbar = true;
    }
    return this.error;
  }
}
</script>

<style scoped>
.editor-block {
  width: 100%;
  height: 100%;
}
</style>
