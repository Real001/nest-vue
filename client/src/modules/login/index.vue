<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="#FFA500">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                label="E-mail"
                type="email"
                v-model="email"
              >
              </v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                v-model="password"
                label="Password"
                type="password"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="submitLogin">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { LoginData } from '@/types/models';

const opt = { namespace: 'auth' };

@Component
export default class Login extends Vue {
  @Action('login', opt) public login!: (data: LoginData) => Promise<void>;
  @State('loginInProgress', opt) public loginInProgress!: boolean;
  @State('loginError', opt) public error!: Error | null;

  public email: string = '';
  public password: string = '';

  public async submitLogin() {
    await this.login({ email: this.email, password: this.password });
  }
}
</script>
