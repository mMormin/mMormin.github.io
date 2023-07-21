import { createStore } from "vuex";

const store = createStore({
  state: {
    authenticated: false,
  },
  mutations: {
    setAuth(state) {
      localStorage.setItem("authenticated", true);
      state.authenticated = true;
    },
    initAuth(state) {
      if (localStorage.getItem("authenticated")) {
        state.authenticated = true;
      }
    },
    deleteAuth(state) {
      if (localStorage.getItem("authenticated")) {
        state.authenticated = false;
        localStorage.removeItem("authenticated");
      }
    },
  },
  actions: {},
  modules: {},
});
export default store;
