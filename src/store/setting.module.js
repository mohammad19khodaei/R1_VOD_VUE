import { FETCH_SETTINGS, UPDATE_SETTING } from "./actions.type";
import { SET_SETTINGS } from "./mutations.type";
import { SettingsService } from "@/common/api.service";
import ApiService from "../common/api.service";

export const state = {
  settings: []
};

export const actions = {
  async [FETCH_SETTINGS](context) {
    const { data } = await SettingsService.get();
    data.settings.map(setting => (setting.mode = "add"));
    context.commit(SET_SETTINGS, data.settings);
    return data;
  },
  [UPDATE_SETTING](context, payload) {
    return ApiService.put(`settings/${payload.id}`, { value: payload.value });
  }
};

export const mutations = {
  [SET_SETTINGS](state, settings) {
    state.settings = settings;
  }
};

const getters = {
  settings(state) {
    return state.settings;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
