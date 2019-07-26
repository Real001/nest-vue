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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-chip color="red" text-color="white" v-if="error">{{
                error
              }}</v-chip>
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
                label="Confirm password"
                type="password"
                :rules="[rules.required, rules.password]"
                required
              >
              </v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="warning"
                  @click="submitCheckIn"
                  :disabled="!valid"
                >
                  Check in
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import cookie from 'js-cookie';
import { LoginData, User, LoginResponse } from '@/types/models';
import { validEmail } from '@/helpers/validation';
import CREATE_USER from './_graphql/createUser.gql';

const opt = { namespace: 'auth' };

@Component
export default class Register extends Vue {
  public user: User = {
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    avatarUrl: '',
    group: '',
    role: 'user',
    password: '',
  };

  public password: string = '';
  public error: string = '';
  private valid: boolean = true;
  public rules = {
    required: (value: string) => !!value || 'Required.',
    email: (value: string) => {
      return validEmail(value);
    },
    password: (value: string) => {
      return (
        this.user.password === value ||
        'The Confirm Password confirmation does not match'
      );
    },
  };

  public submitCheckIn() {
    if ((this.$refs.form as any).validate()) {
      this.$apollo
        .mutate({
          mutation: CREATE_USER,
          variables: {
            user: this.user,
          },
        })
        .then(response => {
          console.log(response);
          cookie.set('code_student_token', response.data.createUser.code_student_token, {
            expires: response.data.createUser.expires_in / 60 / 60 / 24,
          });
          this.$router.push({ name: 'ide' });
        })
        .catch((err: Error) => {
          this.error = err.message;
        });
    }
  }
}
</script>
