<template>
  <v-list-item-group @change="change">
    <v-list-item v-for="item in items" :key="item.key" dark>
      <v-list-item-action>
        <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
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
import { EventDom } from '@/types/events';

@Component
export default class ListItem extends Vue {
  @Prop(Array) public items!: ListItems[];

  @Emit()
  private change() {}
}
</script>
