import {findIndexRouteName} from "../../utils/routes";
import store                from "../../store";

// console.log(await store.getters.nannied)

const routes = {
  koops   : { index: findIndexRouteName('koops'), create: 'koops.create', nannies: 'nannies.index' },
  logout  : 'logout',
  chat    : 'chat.index',
  profile : { index: findIndexRouteName('profile') },
  settings: {
    index   : 'account.settings.index',
    children: 'account.settings.children.index',
    identity: 'account.settings.identity.index',
    address : 'account.settings.address.index',
    password: 'account.settings.password.index',
    diplomas: 'account.settings.diplomas.index',
  },
};

routes.account = Object.values(routes.settings);
Array.prototype.push.apply(routes.account, [routes.profile.index, routes.logout]);


export default [
  {
    title : 'Accueil',
    icon  : 'far fa-home',
    name  : routes.koops.index,
    routes: Object.values(routes.koops),
    show  : true
  },
  {
    title : 'Poster',
    icon  : 'far fa-layer-plus',
    action: 'showCreateKoopsModal',
    show  : true
  },
  {
    title   : 'Mon compte',
    icon    : 'far fa-user',
    children: [
      { title: 'Paramètres', icon: 'fa fa-cog', name: routes.settings.index, routes: Object.values(routes.settings) },
      { title: 'Voir le profil', icon: 'fa fa-eye', name: routes.profile.index },
      // { title: 'Messagerie', icon: 'fa fa-sign-out', name: routes.logout },
      { title: 'Déconnexion', icon: 'fa fa-sign-out', name: routes.logout }
    ],
    routes  : routes.account,
    show    : true
  },
  { title: 'Notifications', icon: 'far fa-bells', action: 'toggleNotifications', show: true },
  { title: 'Messagerie', icon: 'far fa-comments-alt', name: routes.chat, show: true },
];
