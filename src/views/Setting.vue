<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
                <th scope="col">Manage</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(setting, index) in settings" :key="setting.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ setting.name.replaceAll("_", " ") }}</td>
                <td>
                  <template v-if="setting.mode === 'edit'">
                    <input type="text" v-model="setting.value" />
                  </template>
                  <template v-else>
                    {{ setting.value }}
                  </template>
                </td>
                <td>
                  <template v-if="setting.mode === 'edit'">
                    <button
                      class="btn btn-lg btn-primary pull-xs-right"
                      @click="updateValue(setting)"
                    >
                      Update
                    </button>
                  </template>
                  <template v-else>
                    <button
                      class="btn btn-lg btn-primary pull-xs-right"
                      @click="enableEditMode(setting)"
                    >
                      Edit
                    </button>
                  </template>
                </td>
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
import { FETCH_SETTINGS, UPDATE_SETTING } from "@/store/actions.type";

export default {
  name: "Setting",
  data() {
    return {
      mode: "add"
    };
  },
  computed: {
    ...mapGetters(["currentUser", "settings"])
  },
  mounted() {
    if (!this.currentUser.is_admin) {
      this.$router.push({ name: "home" });
    }
    this.fetchSettings();
  },
  methods: {
    fetchSettings() {
      this.$store.dispatch(FETCH_SETTINGS);
    },
    enableEditMode(setting) {
      setting.mode = "edit";
    },
    updateValue(setting) {
      this.$store
        .dispatch(UPDATE_SETTING, setting)
        .then(() => {
          alert("updated successfully");
          setting.mode = "add";
        })
        .catch(err => {
          alert(err.response.data.errors.value[0]);
        });
    }
  }
};
</script>

<style scoped></style>
