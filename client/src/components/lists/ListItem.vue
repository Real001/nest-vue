<template>
  <v-list-item @click="click">
    <v-list-item-action v-if="icon">
      <slot>
        <v-icon>{{ icon }}</v-icon>
      </slot>
      <v-list-item-action-text v-if="text">{{ text }}</v-list-item-action-text>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{ title }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class Listitem extends Vue {
  @Prop({ type: String }) public icon!: string;
  @Prop({ type: String }) public title!: string;
  @Prop({ type: String }) public text!: string;

  @Emit()
  public click() {}
}
</script>
