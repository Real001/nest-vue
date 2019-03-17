<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <list-tile icon="dashboard" title="Dashboard" />
        <list-tile icon="settings" title="Settings" />
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>IDE</v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import ListTile from "@/components/lists/ListTile.vue";

  @Component({ components: { ListTile }})
  export default class NavigationIDE extends Vue {
    public drawer: string | null = null;
	}
</script>