import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<{}>({});
