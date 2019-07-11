<template>
  <div class="form-group col-md-12">
    <label :for="name">{{ title }}</label>
    <input
      class="form-control"
      :placeholder="placeholder"
      :value="value"
      :type="type"
      :name="name"
      @input="input"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { EventDom } from '@/types/events';

@Component
export default class Input extends Vue {
  @Prop(String) public value!: string;
  @Prop(String) public name!: string;
  @Prop(String) public placeholder!: string;
  @Prop(String) public title!: string;
  @Prop({ default: 'text' }) public type!: string;

  @Emit('input')
  public input(event: EventDom) {
    return event.target.value;
  }
}
</script>
