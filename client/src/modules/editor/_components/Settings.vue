<template>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
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
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from "vue-property-decorator";
	import { ConfigEditor } from "@/types/models";
	import { LANGUAGES } from "@/constants/editor";
	import { Select } from "@/types/models";

	@Component
	export default class Settings extends Vue {
		@Prop({ type: Boolean, default: false }) public dialog!: boolean;
		public languages: Select[] = LANGUAGES;
		private config: ConfigEditor = {
			lang: 'javascript',
			theme: 'monokai',
		};
	}
</script>

<style scoped>

</style>