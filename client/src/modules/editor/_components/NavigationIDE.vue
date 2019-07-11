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
    <settings :dialog="dialog" :config="config"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ListTile from '@/components/lists/ListTile.vue';
import ListGroup from '@/components/lists/ListGroup.vue';
import Settings from './Settings.vue';
import { MenuGroup } from '@/types/models';
import { User } from '@/types/models';
import { ConfigEditor } from '@/types/models';

@Component({ components: { ListTile, ListGroup, Settings } })
export default class NavigationIDE extends Vue {
  @Prop() public user!: User;
  @Prop() public config!: ConfigEditor;

  public drawer: string | null = null;
  public menuCode: MenuGroup[] = [
    {
      action: 'code',
      title: 'Code',
      items: [
        { title: 'New', action: '1' },
        { title: 'Open', action: 'folder_open' },
        { title: 'Save', action: 'save' },
      ],
    },
  ];
  public dialog: boolean = false;

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
