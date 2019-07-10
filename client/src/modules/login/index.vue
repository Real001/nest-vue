<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      label="E-mail"
      required
    />

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    />

    <v-btn
      :disabled="!valid"
      color="success"
      @click="validate"
    >
      Login
    </v-btn>

  </v-form>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Login extends Vue {

  }
</script>