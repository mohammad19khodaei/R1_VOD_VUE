import { FETCH_FACTORS } from "./actions.type";
import { SET_FACTORS } from "./mutations.type";
import { FactorsService } from "@/common/api.service";

export const state = {
  factors: []
};

export const actions = {
  async [FETCH_FACTORS](context) {
    const { data } = await FactorsService.get();
    context.commit(SET_FACTORS, data.factors);
    return data;
  }
};

export const mutations = {
  [SET_FACTORS](state, factors) {
    state.factors = factors;
  }
};

const getters = {
  factors(state) {
    return state.factors;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
