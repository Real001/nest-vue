<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">Settings IDE</v-card-title>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-select
              :items="languages"
              label="Language"
              item-text="label"
              item-value="value"
              required
              v-model="language"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat="flat" @click="close">
          Cancel
        </v-btn>
        <v-btn color="green darken-1" flat="flat" @click="close">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { ConfigEditor } from '@/types/models';
import { LANGUAGES } from '@/constants/editor';
import { Select } from '@/types/models';

@Component
export default class Settings extends Vue {
  @Prop({ type: Boolean, default: false }) public dialog!: boolean;
  @Prop() public config!: ConfigEditor;

  public languages: Select[] = LANGUAGES;

  private language: string = '';

  private mounted() {
    this.language = this.config.settings.lang;
  }

  @Watch('config')
  private updateLang() {
    this.language = this.config.settings.lang;
  }

  @Emit()
  private close() {}
}
</script>

<style scoped></style>
