import Vue from 'vue';
import Vuex from 'vuex';
import i18n from "@/i18n";
import {nextLanguage} from "@/utils/localesUtils";
import ProfileService from "@/services/ProfileService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: localStorage.getItem('lang') ? localStorage.getItem('lang') : "sk",
    user: {is_superadmin: ""},
    userInfoLoaded: false
  },
  getters: {
    language: state =>
        state.language,
    isAdmin: state =>
        state.user.is_superadmin,
    userInfoLoaded: state =>
        state.userInfoLoaded,
    userId: state =>
        state.user.id,
    userEmail: state =>
        state.user.email,
    user: state =>
        state.user
  },
  mutations: {
    setNextLanguage(state) {
      const nextLanguageState = nextLanguage(state.language);
      // Store new language in state
      state.language = nextLanguageState;
      // Set new language in locale storage
      localStorage.setItem('lang', nextLanguageState);
      // Notify vue-i18n plugin
      i18n.locale = nextLanguageState;
    },
    "setUser": (state, user) => {
      state.user = user;
    },
    setUserInfoStatus(state, status) {
      state.userInfoLoaded = status;
    }
  },
  actions: {
    fetchSetUser({commit}) {
      return ProfileService.getProfile()
          .then(user => commit("setUser", user));
    }
  }
})
