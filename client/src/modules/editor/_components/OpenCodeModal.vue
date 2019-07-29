<template>
  <modal title="Open is" clickTitle="open" :dialog="dialog" @close="close">
    <div>
      <list-tile
        v-for="subItem in items"
        :key="subItem.key"
        :title="subItem.title"
        :icon="true"
        :text="dateUpdated(subItem.date)"
        @click="subItem.click"
      >
      </list-tile>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { MenuGroup } from '@/types/models';
import ListTile from '@/components/lists/ListTile.vue';
import Modal from '@/components/modals/Modal.vue';

@Component({ components: { ListTile, Modal } })
export default class OpenCodeModal extends Vue {
  @Prop() public items!: MenuGroup[];
  @Prop() public dialog!: boolean;


  public dateUpdated(date: Date) {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(date));
  }

  @Emit()
  private close() {
    /* */
  }
}
</script>
