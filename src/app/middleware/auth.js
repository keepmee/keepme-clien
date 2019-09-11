/**
 * File app/middleware/auth.js
 *
 * Ce fichier contient le middleware pour l'accès à l'app
 *
 * @author sofianeakbly
 **/

import helpers from '../helpers'
import store   from "../store";


/**
 * Vérifie si l'accès à l'app est autorisé
 *
 * @param to La route suivante
 * @param from La route de provenance
 * @param next La requête suivante
 **/
export default async function (to, from, next) {
  $(window).scrollTop(0)
  return await store.getters.logged ? next() : next({ name: 'login' })
}
