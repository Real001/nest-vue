<template>
  <div>
    <v-list-group
      v-for="item in items"
      :key="item.title"
      v-model="item.active"
      :prepend-icon="item.action"
    >
      <template v-slot:activator>
        <list-item :title="item.title" />
      </template>

      <list-item
        v-for="subItem in item.items"
        :key="subItem.title"
        :title="subItem.title"
        :icon="subItem.action"
        @click="subItem.click"
      />
    </v-list-group>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { MenuGroup } from '@/types/models';
import ListItem from './ListItem.vue';

@Component({ components: { ListItem } })
export default class ListGroup extends Vue {
  @Prop() public items!: MenuGroup[];
}
</script>
