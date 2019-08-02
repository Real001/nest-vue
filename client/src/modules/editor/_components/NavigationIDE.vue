<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <list-item icon="dashboard" title="Dashboard" />
        <list-group :items="menuCode" />
        <list-item icon="settings" title="Settings" @click="openSettings" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app fixed clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>IDE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="green">play_arrow</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img :src="user.avatarUrl" :alt="fullName" />
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <settings
      @close="closeSettings"
      :dialog="dialog"
      :config="config"
      :id="user._id"
    />
    <modal-input
      :dialog="isSave"
      title="Save is"
      label="Name"
      clickTitle="Save"
      @click="saveCode"
      @close="closeSave"
    />
    <ApolloQuery
      :query="require('../_graphql/listCodes.graphql')"
      :variables="{ user: user._id }"
      fetchPolicy="network-only"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <open-code-modal
          :dialog="isOpen"
          @close="closeOpenCodeModal"
          :items="data.listCodeUser"
          @click-ok="clickOpenCodeModal"
        />
      </template>
    </ApolloQuery>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { ApolloQueryResult } from 'apollo-client';
import ListItem from '@/components/lists/ListItem.vue';
import ModalInput from '@/components/modals/ModalInput.vue';
import Settings from './Settings.vue';
import { MenuGroup, ConfigEditor, User } from '@/types/models';
import ListGroup from '@/components/lists/ListGroup.vue';
import SAVE_CODE from '../_graphql/saveCode.gql';
import OpenCodeModal from '../_components/OpenCodeModal.vue';
import { LOADING_CODE, ERROR } from '@/constants/mutation-types';
import CODE_BY_ID from '../_graphql/codebyId.graphql';
import { CodeById } from '@/types/queries';

@Component({
  components: { ListItem, ListGroup, Settings, ModalInput, OpenCodeModal },
})
export default class NavigationIDE extends Vue {
  @Prop() public user!: User;
  @Prop() public config!: ConfigEditor;
  @Prop(String) public code!: string;

  @Mutation(LOADING_CODE, { namespace: 'ide' })
  public loadingCode!: (code: string) => void;
  @Mutation(ERROR, { namespace: 'ide' })
  public error!: (error: string) => void;

  public drawer: string | null = null;
  public menuCode: MenuGroup[] = [
    {
      action: 'code',
      title: 'Code',
      items: [
        { title: 'New', action: '1', click: this.newCode },
        { title: 'Open', action: 'folder_open', click: this.openCodeModal },
        { title: 'Save', action: 'save', click: this.openSaveModal },
      ],
    },
  ];
  public dialog: boolean = false;
  public isSave: boolean = false;
  public isOpen: boolean = false;

  @Emit()
  private newCode() {}

  @Emit()
  private openCodeModal() {
    this.isOpen = true;
  }

  @Emit()
  private openSaveModal() {
    this.isSave = true;
  }

  @Emit()
  private saveCode(name: string) {
    this.$apollo.mutate({
      mutation: SAVE_CODE,
      variables: {
        code: this.code,
        name,
        lang: this.config.settings.lang,
        user: this.user._id,
      },
    });
    this.isSave = false;
  }
  @Emit()
  private closeSave() {
    this.isSave = false;
  }

  @Emit()
  private closeOpenCodeModal() {
    this.isOpen = false;
  }

  @Emit()
  private clickOpenCodeModal(id: string) {
    this.$apollo
      .query({
        query: CODE_BY_ID,
        variables: {
          _id: id,
        },
        fetchPolicy: 'network-only',
      })
      .then((result: ApolloQueryResult<CodeById>) => {
        if (!result.errors) {
          this.loadingCode(result.data.codeById.code);
        } else {
          this.error(result.errors[0].message);
        }
      })
      .catch((err: Error) => {
        if (err.stack) {
          this.error(err.stack);
        }
      });
    this.isOpen = false;
  }

  @Emit()
  public closeSettings() {
    this.dialog = false;
  }

  @Emit()
  public openSettings() {
    this.dialog = true;
  }

  public get fullName() {
    if (this.user) {
      return `${this.user.firstName} ${this.user.lastName}`;
    }
    return '';
  }
}
</script>
