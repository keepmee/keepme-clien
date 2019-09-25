/**
 * File app/router/index.js
 *
 * Ce fichier contient les routes d'accès à l'app
 *
 * @author sofianeakbly
 **/

import Vue    from 'vue'
import Router from 'vue-router'
import Route  from 'vue-routisan'

import Middleware from '../middleware'

import HomeIndex                    from '../../components/pages/Home/Index'
import KoopsIndex                   from '../../components/pages/Koops/Index'
import KoopsShow                    from '../../components/pages/Koops/Show'
import AccountSettingsIndex         from '../../components/pages/Account/Settings/Index'
import AccountSettingsChildrenIndex from '../../components/pages/Account/Settings/pages/Children/Index'
import AccountSettingsIdentityIndex from '../../components/pages/Account/Settings/pages/Identity/Index'
import AccountSettingsAddressIndex  from '../../components/pages/Account/Settings/pages/Address/Index'
import AccountSettingsPasswordIndex from '../../components/pages/Account/Settings/pages/Password/Index'
import AccountProfileIndex          from '../../components/pages/Account/Profile/Index'
import AccountProfileNotifications  from '../../components/pages/Account/Profile/Notifications'
import AccountSettingsDiplomasIndex from '../../components/pages/Account/Settings/pages/Diplomas/Index'
import ProfileIndex                 from '../../components/pages/Profile/Index'

import Login          from '../../components/pages/Auth/Login'
import Register       from '../../components/pages/Auth/Register/Index'
import PasswordForgot from '../../components/pages/Auth/Password/Forgot'
import PasswordReset  from '../../components/pages/Auth/Password/Reset'
import Logout         from '../../components/pages/Auth/Logout'

Vue.use(Router)

Route.group({ beforeEnter: Middleware.Auth }, () => {

  // Route.view('/post/create', HomePostCreate).name('home.post.create')

  /* Page d'accueil connecté */
  Route.view('/koops', KoopsIndex).name('koops.index')
  Route.view('/koops/show/:name/:id', KoopsShow).name('koops.show')

  /**
   * Pages de gestion du compte
   */
  // Route.view('/profile', ProfileIndex).name('profile.index')
  Route.view('/account/settings', AccountSettingsIndex).name('account.settings.index')
  Route.view('/account/settings/children', AccountSettingsChildrenIndex).name('account.settings.children.index')
  Route.view('/account/settings/identity', AccountSettingsIdentityIndex).name('account.settings.identity.index')
  Route.view('/account/settings/address', AccountSettingsAddressIndex).name('account.settings.address.index')
  Route.view('/account/settings/password', AccountSettingsPasswordIndex).name('account.settings.password.index')
  Route.view('/account/settings/diplomas', AccountSettingsDiplomasIndex).name('account.settings.diplomas.index')

  Route.view('/account/profile', AccountProfileIndex).name('account.profile.index')
  // Route.view('/account/profile/notifications', AccountProfileNotifications).name('account.profile.notifications')

  Route.view('/profile/:separator/:name', ProfileIndex).name('profile.index')

  Route.view('/logout', Logout).name('logout')
})

Route.group({ beforeEnter: Middleware.Guest }, () => {

  /* Page d'accueil */
  Route.view('/', HomeIndex).name('home')

  /* Page de connexion */
  Route.view('/login', Login).name('login')
  /* Page d'inscription*/
  Route.view('/register', Register).name('register')
  /* Page de mot de passe oublié */
  Route.view('/password/forgot', PasswordForgot).name('password.forgot')
  /* Page de reset mot de passe */
  Route.view('/password/reset/:email', PasswordReset).name('password.reset')
});


Route.redirect('*', '/')

export default new Router({
  routes: Route.all(),
})
