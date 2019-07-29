<template>
  <v-list-tile @click="click">
    <v-list-tile-action v-if="icon">
     <slot>
       <v-icon>{{ icon }}</v-icon>
     </slot>
      <v-list-tile-action-text v-if="text">{{ text }}</v-list-tile-action-text>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class ListTile extends Vue {
  @Prop({ type: String }) public icon!: string;
  @Prop({ type: String }) public title!: string;
  @Prop({ type: String }) public text!: string;

  @Emit()
  public click() {}
}
</script>
