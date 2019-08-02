<template>
  <modal-common
    title="Open is"
    clickTitle="open"
    :dialog="dialog"
    @close="close"
    @click-ok="clickOk(item)"
    :disabled="!item"
  >
    <v-card item class="mx-auto">
      <v-list>
        <list-item-two :items="itemsUpdate" @change="change" />
      </v-list>
    </v-card>
  </modal-common>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { ListCode } from '@/types/models';
import ListItemTwo from '@/components/lists/ListItemTwo.vue';
import ModalCommon from '@/components/modals/ModalCommon.vue';

@Component({ components: { ListItemTwo, ModalCommon } })
export default class OpenCodeModal extends Vue {
  @Prop() public items!: ListCode[];
  @Prop() public dialog!: boolean;

  private item: string = '';

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

  @Emit()
  private change(index: number) {
    this.item = this.items[index]._id;
  }

  @Emit()
  private clickOk(item: string) {
    return item;
  }
}
</script>
