<template>
  <div>
    <h1>List of your factors</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Number</th>
          <th scope="col">Type of product</th>
          <th scope="col">amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factor, index) in factors">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ factor.factor_number }}</td>
          <td>{{ factor.product_type }}</td>
          <td>{{ factor.amount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_FACTORS } from "../store/actions.type";

export default {
  name: "Factors",
  mounted() {
    this.fetchFactors();
  },
  computed: {
    ...mapGetters(["factors"])
  },
  methods: {
    fetchFactors() {
      this.$store.dispatch(FETCH_FACTORS);
    }
  }
};
</script>
