<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field :label="label" v-model="text"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="close">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" flat="flat" @click="click(text)">
          {{ clickTitle }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class ModalInput extends Vue {
  @Prop({ type: Boolean, default: false }) public dialog!: boolean;
  @Prop(String) public title!: string;
  @Prop(String) public label!: string;
  @Prop(String) public clickTitle!: string;

  private text: string = '';

  @Emit()
  private close() {}

  @Emit()
  private click(text: string) {
    return text;
  }
}
</script>

<style scoped></style>
