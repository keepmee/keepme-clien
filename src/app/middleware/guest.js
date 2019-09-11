/**
 * File app/middleware/guest.js
 *
 * Ce fichier contient le middleware pour l'accès à l'app
 *
 * @author sofianeakbly
 **/


import store from "../store";
import api   from '../api'

/**
 * Vérifie si l'accès à l'app est autorisé
 *
 * @param to La route suivante
 * @param from La route de provenance
 * @param next La requête suivante
 **/
export default async function (to, from, next) {
  $(window).scrollTop(0)
  return await store.getters.logged ? next({ name: 'koops.index' }) : next()
  /*api.get('/logged').then((response) => {
    console.log(response.data.data)
    if (response && response.data && response.data.data.logged)
      return next({ name: 'home' })
    else
      return next()
  })*/
  // next()
}
