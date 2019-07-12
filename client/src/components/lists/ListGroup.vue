<template>
  <div>
    <v-list-group
      v-for="item in items"
      :key="item.title"
      v-model="item.active"
      :prepend-icon="item.action"
      no-action
    >
      <template v-slot:activator>
        <list-tile :title="item.title" />
      </template>

      <list-tile
        v-for="subItem in item.items"
        :key="subItem.title"
        :title="subItem.title"
        :icon="subItem.action"
      />
    </v-list-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { MenuGroup } from '@/types/models';
import ListTile from './ListTile.vue';

@Component({ components: { ListTile } })
export default class ListGroup extends Vue {
  @Prop() public items!: MenuGroup[];
}
</script>
