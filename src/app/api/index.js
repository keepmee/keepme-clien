/**
 * File app/api/index.js
 *
 * Ce fichier sera le noyau pour toutes les requête avec le serveur
 *
 * @author sofianeakbly
 **/

import swal   from 'sweetalert2'
import cookie from 'json-cookie'

import store   from '../store'
import router  from '../router'
import helpers from '../helpers'

export default (function () {

  let self = {};
  let http = require('axios'),
    server = store.getters.API_SERVER + '/api';

  http.defaults.headers.common['Authorization'] = `Bearer ${cookie.get(store.getters.COOKIE_NAME)}`;

  // http.defaults.headers.common['Content-type'] = 'application/json';

  function setConfig(config, method, url, data, headers = {}) {
    config.method = method;
    config.url = `${url}`;
    config.data = { data };
    config.headers = headers;

    return config
  }

  function redirectLogin() {
    router.push({ name: 'login' });
    cookie.delete(store.getters.COOKIE_NAME)
    location.reload()
  }


  function errorFeedback(error, url) {
    if (error && error.response && error.response.data) {
      if (url !== '/login' && error.response.data.status === 401) redirectLogin();
      else if (error.response.data.status === 401 || error.response.data.status === 403) ;
      // swal('Désolé', error.response.data.error, 'error');
      else ;
      // swal('Désolé', 'Une erreur est survenue, merci de réessayer plus tard', 'error')
    } else ;
    // swal('Désolé', 'Une erreur est survenue, merci de réessayer plus tard', 'error')
  }

  self.server = server;

  /**
   * Effectuer une requête GET
   *
   * @param url
   * @param load
   **/
  self.get = (url, load = true) => {
    return new Promise((resolve, reject) => {

        helpers.loading();

        http.get(`${server}${url}`).then((r) => {
          helpers.loading(!load);
          resolve(r)
        }, (e) => {
          helpers.loading(!load);
          errorFeedback(e, url);
          reject(e)
        })

      }
    )
  };


  /**
   * Effectuer une requête POST
   *
   * @param url
   * @param data
   * @param load
   * @param config
   **/
  self.post = (url, data, load = true, config = {}) => {

    config = setConfig(config, 'POST', server + url, data);

    return new Promise((resolve, reject) => {

      helpers.loading();

      http(config).then((r) => {
        helpers.loading(!load);
        resolve(r)
      }, (e) => {
        helpers.loading(!load);
        errorFeedback(e, url);
        reject(e)
      })
    })
  };

  /**
   * Effectuer une requête POST
   *
   * @param url
   * @param data
   * @param load
   * @param config
   **/
  self.postImage = (url, data, config = {}) => {

    // config = setConfig(config, 'POST', server + url, data, { 'Content-Type': 'multipart/form-data' });
    config.method = 'POST';
    config.url = `${server}${url}`;
    config.data = data;
    config.headers = { 'Content-Type': 'multipart/form-data' };

    return new Promise((resolve, reject) => {

      helpers.loading();

      http(config).then((r) => {
        helpers.loading(false);
        resolve(r)
      }, (e) => {
        helpers.loading(false);
        errorFeedback(e, url);
        reject(e)
      })
    })
  };


  /**
   * Effectuer une requête PUT
   *
   **/
  self.put = (url, id, data, load = true, config = {}) => {

    config = setConfig(config, 'PUT', `${server}${url}/${id}`, data);

    return new Promise((resolve, reject) => {

      helpers.loading();

      http(config).then((r) => {
        helpers.loading(!load);
        resolve(r)
      }, (e) => {
        helpers.loading(!load);
        errorFeedback(e, url);
        reject(e)
      })
    })
  };


  /**
   * Effectuer une requête DELETE
   *
   **/
  self.delete = (url, id, load = true, config = {}) => {

    config = setConfig(config, 'DELETE', `${server}${url}/${id}`, null);

    return new Promise((resolve, reject) => {

      helpers.loading();

      http(config).then((r) => {
        helpers.loading(!load);
        resolve(r)
      }, (e) => {
        helpers.loading(!load);
        errorFeedback(e, url);
        reject(e)
      })
    })
  };

  return self

})()
