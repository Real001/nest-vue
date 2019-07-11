<template>
  <div>
    <div class="col-md-12 form-wrapper">
      <h2>Create student</h2>
      <apollo-mutation
        :mutation="require('@/graphql/createStudent.graphql')"
        :variables="{ createCustomerInput: student }"
      >
        <template slot-scope="{ mutate, loading }">
          <form id="create-post-form">
            <v-input
              title="First Name"
              name="firstName"
              placeholder="First Name"
              v-model="student.firstName"
            />
            <v-input
              title="Last Name"
              name="lastName"
              placeholder="Last Name"
              v-model="student.lastName"
            />
            <v-input
              title="Email"
              name="email"
              placeholder="Email"
              v-model="student.email"
              type="email"
            />
            <v-input
              title="Phone "
              name="phone"
              placeholder="Phone "
              v-model="student.phone"
            />
            <v-input
              title="Address"
              name="address"
              placeholder="Address"
              v-model="student.address"
            />
            <v-input
              title="Description"
              name="description"
              placeholder="Description"
              v-model="student.description"
            />
            <div class="form-group col-md-4 pull-right">
              <button
                class="btn btn-success"
                type="submit"
                :disabled="loading"
                @click="mutate()"
              >
                Create student
              </button>
            </div>
          </form>
        </template>
      </apollo-mutation>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import vInput from '@/components/inputs/Input.vue';
import { User } from '@/types/models';

@Component({ components: { vInput } })
export default class Create extends Vue {
  public student: User = {
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    group: '',
    role: 'user',
  };
}
</script>

<style scoped></style>
