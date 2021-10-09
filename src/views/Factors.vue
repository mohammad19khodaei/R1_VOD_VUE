<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Charge Your Account</h1>
          <form @submit.prevent="chargeAccount">
            <fieldset class="form-group">
              <input
                class="form-control"
                type="text"
                v-model="chargeAmount"
                placeholder="Enter amount of charge"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              charge account
            </button>
          </form>
        </div>
      </div>
      <div class="row mt">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">List of your factors</h1>
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
              <tr v-for="(factor, index) in factors" :key="factor.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ factor.factor_number }}</td>
                <td>{{ factor.product_type }}</td>
                <td>{{ factor.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_FACTORS, CHARGE_ACCOUNT } from "@/store/actions.type";

export default {
  name: "Factors",
  data() {
    return {
      chargeAmount: null
    };
  },
  mounted() {
    this.fetchFactors();
  },
  computed: {
    ...mapGetters(["factors"])
  },
  methods: {
    fetchFactors() {
      this.$store.dispatch(FETCH_FACTORS);
    },
    chargeAccount() {
      this.$store
        .dispatch(CHARGE_ACCOUNT, { amount: this.chargeAmount })
        .then(() => {
          this.chargeAmount = null;
          alert("User Account Charged Successfully");
        })
        .catch(err => {
          alert(err.response.data.errors.amount[0]);
        });
    }
  }
};
</script>

<style scoped>
.mt {
  margin-top: 30px;
}
</style>
