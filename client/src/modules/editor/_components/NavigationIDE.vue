<template>
  <div>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <list-tile icon="dashboard" title="Dashboard" />
        <list-group :items="menuCode" />
        <list-tile icon="settings" title="Settings" @click="openSettings" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>IDE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img :src="user.avatarUrl" :alt="fullName" />
        </v-avatar>
      </v-btn>
    </v-toolbar>
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import ListTile from '@/components/lists/ListTile.vue';
import ModalInput from '@/components/modals/ModalInput.vue';
import Settings from './Settings.vue';
import { MenuGroup } from '@/types/models';
import { User } from '@/types/models';
import { ConfigEditor } from '@/types/models';
import ListGroup from '@/components/lists/ListGroup.vue';
import SAVE_CODE from '../_graphql/saveCode.gql';

@Component({ components: { ListTile, ListGroup, Settings, ModalInput } })
export default class NavigationIDE extends Vue {
  @Prop() public user!: User;
  @Prop() public config!: ConfigEditor;
  @Prop(String) public code!: string;

  public drawer: string | null = null;
  public menuCode: MenuGroup[] = [
    {
      action: 'code',
      title: 'Code',
      items: [
        { title: 'New', action: '1', click: this.newCode },
        { title: 'Open', action: 'folder_open' },
        { title: 'Save', action: 'save', click: this.openSaveModal },
      ],
    },
  ];
  public dialog: boolean = false;
  public isSave: boolean = false;

  private newCode() {}

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
