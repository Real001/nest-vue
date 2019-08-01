<template>
  <modal title="Open is" clickTitle="open" :dialog="dialog" @close="close">
    <v-card item class="mx-auto">
      <v-list shaped>
        <list-item-two :items="itemsUpdate" />
      </v-list>
    </v-card>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { ListCode } from '@/types/models';
import ListItemTwo from '@/components/lists/ListItemTwo.vue';
import Modal from '@/components/modals/Modal.vue';

@Component({ components: { ListItemTwo, Modal } })
export default class OpenCodeModal extends Vue {
  @Prop() public items!: ListCode[];
  @Prop() public dialog!: boolean;

  public dateUpdated(date: Date) {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(date));
  }

  public get itemsUpdate() {
    return this.items.map(item => ({
      key: item._id,
      title: item.name,
      subtitle: this.dateUpdated(item.updatedAt),
      icon: 'folder',
      iconClass: 'grey lighten-1 white--text',
    }));
  }

  @Emit()
  private close() {
    /* */
  }
}
</script>
