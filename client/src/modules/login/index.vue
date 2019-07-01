<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
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
</script>