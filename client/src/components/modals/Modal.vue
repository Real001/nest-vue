<template>
  <v-dialog v-model="dialog" :max-width="width">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <slot></slot>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="close">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" flat="flat" @click="click">
          {{ clickTitle }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { MenuGroup } from '@/types/models';

@Component
export default class OpenCodeModal extends Vue {
  @Prop() public title!: string;
  @Prop() public clickTitle!: string;
  @Prop({ type: Boolean, default: () => false }) public dialog!: boolean;
  @Prop({ default: () => 600 }) public width!: number;

  @Emit()
  private close() {
    /* */
  }

  @Emit()
  private click() {
    /* */
  }
}
</script>
