import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Declare empty store first, dynamically register all modules later.
const Store = new Vuex.Store<{}>({});
export default Store;
