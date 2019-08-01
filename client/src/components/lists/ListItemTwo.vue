<template>
  <v-list-item-group v-model="item">
    <v-list-item v-for="item in items" :key="item.key" @click="click" dark>
      <v-list-item-icon>
        <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-sub-title>{{ item.subtitle }}</v-list-item-sub-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1">info</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list-item-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { ListItems } from '@/types/models';

@Component
export default class Listitem extends Vue {
  @Prop({ type: String }) public icon!: string;
  @Prop({ type: String }) public title!: string;
  @Prop({ type: String }) public text!: string;
  @Prop(Object) public items!: ListItems;

  @Emit()
  public click() {}
}
</script>
