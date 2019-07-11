<template>
  <v-app id="editor" dark>
    <navigation-i-d-e :user="user" :config="config"/>
    <v-content>
      <v-container fluid fill-height>
        <ace-editor v-model="code" :config="config" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { ConfigEditor, User } from '@/types/models';
import NavigationIDE from './_components/NavigationIDE.vue';
import QUERY_SETTINGS from './_graphql/querySettings.gql'

@Component({ components: { NavigationIDE } })
export default class EditorPage extends Vue {
  @Getter('user', { namespace: 'auth' }) public user!: User;

  private code: string = 'jjkhjl';

  private get config() {
    const config = this.$apollo.query({
      query: QUERY_SETTINGS,
      variables: {
        user:this.user._id
      }
    });
    console.log(config)
    return null;
  }
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
