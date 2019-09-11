import router from '../router'

const routes = router.options.routes

const find = (route) => {
  console.log(route, routes[0])
}

const findRoutesByName = (name) => routes.find(route => route.name === name)
const findRoutesNameContains = (name) => routes.filter(route => route.name ? route.name.search(name) >= 0 : null)
const findIndexRoute = (folder) => routes.find((route) => route.name ? route.name.search(`${folder}.index`) >= 0 : null)
const findIndexRouteName = (folder) => (findIndexRoute(folder) || { name: 'n/a' }).name
export {
  find,
  findRoutesByName,
  findRoutesNameContains,
  findIndexRouteName,
}
