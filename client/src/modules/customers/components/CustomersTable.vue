<template>
  <table class="table table-bordered">
    <thead class="thead-dark">
      <tr>
        <th scope="col">First name</th>
        <th scope="col">Lats name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">Address</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ customer.firstName }}</td>
        <td>{{ customer.lastName }}</td>
        <td>{{ customer.email }}</td>
        <td>{{ customer.phone }}</td>
        <td>{{ customer.address }}</td>
        <td>{{ customer.description }}</td>
        <td>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group" style="margin-bottom: 20px;">
              <router-link
                :to="{ name: 'Edit', params: { id: customer.id } }"
                class="btn btn-sm btn-outline-secondary"
                >Edit Customer
              </router-link>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="deleteCustomer(customer.id)"
              >
                Delete Customer
              </button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { User, ID } from '@/types/models';

@Component
export default class CustomersTable extends Vue {
  @Prop() public customers!: User[];

  @Emit('delete')
  public deleteCustomer(id: ID) {
    return id;
  }
}
</script>
