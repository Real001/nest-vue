<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Nest Customer List</h1>
    </div>
    <div>
      <apollo-query :query="require('../../graphql/customers.graphql')">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-if="loading" class="loading apollo">Loading...</div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <div v-if="data.customers.length === 0">
            <h2>No customer found at the moment</h2>
          </div>
          <customer-table :customers="data.customers" />
        </template>
      </apollo-query>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CustomerTable from './components/CustomersTable.vue';

@Component({ components: { CustomerTable } })
export default class CustomersPage extends Vue {}
</script>
