<template>
  <v-app id="editor" dark>
    <navigation-i-d-e />
    <v-content>
      <v-container fluid fill-height>
        <ace-editor v-model="code" :config="config"/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
	import { ConfigEditor } from "@/types/models";
	import NavigationIDE from "./_components/NavigationIDE.vue";

  @Component({ components: { NavigationIDE }})
  export default class EditorPage extends Vue {
    private code: string = 'jjkhjl';
    private config: ConfigEditor = {
			lang: 'javascript',
			theme: 'monokai',
    };
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