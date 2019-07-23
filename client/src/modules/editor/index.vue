<template>
  <v-app id="editor" dark>
    <ApolloQuery
      :query="require('./_graphql/querySettings.gql')"
      :variables="{ user: user._id }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="amber"
        ></v-progress-circular>
        <v-alert
          v-else-if="error"
          :value="true"
          type="error"
        >
          {{error}}
        </v-alert>
        <!--TODO поправить отображение редактора-->
        <div v-else-if="data">
          <navigation-i-d-e :user="user" :config="data" />
          <v-content>
            <v-container fluid fill-height>
              <v-layout>
                <ace-editor v-model="code" :config="data" />
              </v-layout>
            </v-container>
          </v-content>
        </div>
      </template>
    </ApolloQuery>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ConfigEditor, User } from '@/types/models';
import NavigationIDE from './_components/NavigationIDE.vue';

@Component({ components: { NavigationIDE } })
export default class EditorPage extends Vue {
  @Getter('user', { namespace: 'auth' }) public user!: User;

  private code: string = 'jjkhjl';


}
</script>

<style scoped>
.editor-block {
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
