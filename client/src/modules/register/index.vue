<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="#FFA500">
            <v-toolbar-title>Register form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                label="First name"
                type="text"
                v-model="user.firstName"
                required
                :rules="[rules.required]"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="person"
                label="Last name"
                type="text"
                v-model="user.lastName"
                required
                :rules="[rules.required]"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="person"
                label="Group"
                type="text"
                v-model="user.group"
                required
                :rules="[rules.required]"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="person"
                label="Description"
                type="text"
                v-model="user.description"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="person"
                label="Avatar url"
                type="text"
                v-model="user.avatarUrl"
              >
              </v-text-field>
              <v-text-field
                prepend-icon="person"
                label="E-mail"
                type="email"
                v-model="user.email"
                required
                :rules="[rules.required, rules.email]"
              >
              </v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                v-model="user.password"
                dfsf
                label="Password"
                type="password"
                :rules="[rules.required]"
                required
              >
              </v-text-field>
              <v-text-field
                id="password"
                prepend-icon="lock"
                v-model="password"
                dfsf
                label="Repeat password"
                type="password"
                :rules="[rules.required]"
                required
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="submitCheckIn">
              Check in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';
  import { Action, State } from 'vuex-class';
  import { LoginData, User } from '@/types/models';
  import { validEmail } from '@/helpers/validation';
  import CREATE_USER from './_graphql/createUser.gql';

  const opt = { namespace: 'auth' };

  @Component
  export default class Register extends Vue {
    @Action('login', opt) public login!: (data: LoginData) => Promise<void>;
    @State('loginInProgress', opt) public loginInProgress!: boolean;
    @State('loginError', opt) public error!: Error | null;

    public user: User = {
      firstName: '',
      lastName: '',
      email: '',
      description: '',
      avatarUrl: '',
      group: '',
      role: 'user',
    };

    public password: string = '';
    public rules = {
      required: (value: string) => !!value || 'Required.',
      email: (value: string) => {
        return validEmail(value);
      },
    };

    public submitCheckIn() {
      this.$apollo.mutate({
        mutation: CREATE_USER,
        variables: {
          user: this.user,
        }
      }).then((data) => {
        console.log(data)
      });
    }
  }
</script>
