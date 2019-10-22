/**
 * File app/store/index.js
 *
 * Ce fichier contient les données vuex
 *
 * @author sofianeakbly
 **/

import Vue     from 'vue'
import Vuex    from 'vuex'
import helpers from "../helpers";

Vue.use(Vuex);

const state = {
  APP_NAME   : process.env.APP_NAME || 'keepme-client', // Nom de l'application et du cookie
  API_SERVER : process.env.API_SERVER || "http://localhost:4001", // Adresse du serveur
  COOKIE_NAME: "keepme_token", // Adresse du serveur
  GMAPS_KEY  : 'AIzaSyDmlw5nwiNkWJo3Xznkn05vLFpP10lBXjU',
  OSMURL     : 'https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  user       : null,
  loading    : false, // Le formulaire est envoyé
};

const mutations = {
  setLoading(state, loading) {
    state.loading = loading
  },

  setUser(state, user) {
    state.user = user
  },

  setAppName(state, name) {
    state.APP_NAME = name
  },

  setApiServer(state, url) {
    state.API_SERVER = url
  }
};

const actions = {

  loading(context, loading) {
    context.commit('setLoading', loading)
  },

  user(context, user) {
    context.commit('setUser', user)
  },

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {
    APP_NAME   : state => state.APP_NAME,
    API_SERVER : state => state.API_SERVER,
    COOKIE_NAME: state => state.COOKIE_NAME,
    GMAPS_KEY  : state => state.GMAPS_KEY,
    OSMURL     : state => state.OSMURL,
    loading    : state => state.loading,
    logged     : async () => {
      try {
        await helpers.logged();
        return true
      } catch (e) {
        return false
      }
    },
    nannied    : async () => {
      try {
        await helpers.nannied();
        return true
      } catch (e) {
        return false
      }
    },
    user       : () => {
      async function database() {
        try {
          return await helpers.getUserDatabase()
        } catch (e) {
          return null
        }
      }

      return {
        storage: helpers.getUserStorage(),
        cookie : helpers.getUserCookie(),
        database,
      }
    },
    storage    : state => {
      return { prefix: `storage:${state.APP_NAME}:` }
    },
  }
})
