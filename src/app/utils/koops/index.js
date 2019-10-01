import helpers from "../../helpers";
import api     from "../../api"

import {date, jsonParse} from "../index";

const getDistanceBetween = (latitude1, longitude1, latitude2, longitude2, unit = 'K') => parseInt(helpers.distance(latitude1, longitude1, latitude2, longitude2, unit));


const getKoops = (which = null, load = true) => {
  return new Promise((resolve, reject) => {
    let url = `/koops${which && which.length > 0 ? '/' + which : ''}`;
    api.get(url, load).then(
      (response) => resolve(response && response.data && response.data.data && response.data.data.koops ? response.data.data.koops : null),
      (error) => reject(error)
    )
  })
};

const getUserLocation = (vue) => {
  return new Promise((resolve, reject) => {
    api.get('/address/current/location', false).then(
      (response) => {
        if (response && response.data && response.data.data && response.data.data.latitude && response.data.data.longitude)
          return resolve(helpers.clone({ lat: response.data.data.latitude, lng: response.data.data.longitude }));
        else {
          helpers.loading(false)
          vue.$getLocation({ enableHighAccuracy: true }).then(
            (coordinates) => resolve(helpers.clone(coordinates)),
            () => reject(5962)
          )
        }
      },
      (error) => reject(error)
    )
  })
}

const getTime = (start = null, end = null, format = true) => date.diff(start, end, format);

const getImage = (koop) => {
  let tmp = jsonParse(koop.children), length = tmp === null ? 0 : tmp.length,
    name = length === 1 ? 'kid-1' : length === 2 ? 'kid-2' : length === 3 ? 'kid-3' : length === 4 ? 'kid-4' : 'kid';
  return require('../../../assets/img/kids/' + name + '.jpg')
};

const setAllKoopDistance = (center, radius) => new Promise(
  (resolve, reject) => {
    api.get(`/koops/location/${center.lat}/${center.lng}/${radius}`).then(
      (response) => resolve(setAllKoopImage(response.data.data)),
      (error) => reject(error)
    )
  }
)


const setAllKoopTime = (koops) => koops ? ((koops) => {
  koops.forEach((koop) => koop.duration = getTime(helpers.moment(koop.start), helpers.moment(koop.end)));
  return helpers.clone(koops)
})(koops) : null;


const setAllKoopImage = (koops) => koops ? ((koops) => {
  koops.forEach((koop) => koop.image = getImage(koop));
  return helpers.clone(koops)
})(koops) : null;


const setAllKoopChildren = (koops) => koops ? ((koops) => {
  koops.map((koop) => koop.children = jsonParse(koop.children));
  return helpers.clone(koops)
})(koops) : null;

const setAllKoopData = (koops, center) => setAllKoopImage(koops);
// const setAllKoopData = (koops, center) => /*setAllKoopChildren(*/setAllKoopImage(/*setAllKoopTime(setAllKoopDistance(*/koops, center)//))//);

const isVisibleKoop = (geolocation, koop, all = false) =>
  koop.nanny_id !== null ? false : all === false && geolocation.radius !== null
    ? getDistanceBetween(geolocation.center.lat, geolocation.center.lng, koop.location.lat, koop.location.lng, 'm') < geolocation.radius : true

const isCurrentSortedBy = (field, sortedBy) => sortedBy === field || sortedBy === `-${field}`

const sortBy = (koops, field, sortedBy) => {
  if (isCurrentSortedBy(field, sortedBy)) {
    return {
      koops   : koops ? helpers.clone(koops.reverse()) : null,
      sortedBy: sortedBy === `-${field}` ? field : `-${field}`
    }
  }
  if (field === 'distance')
    koops.sort((a, b) => (parseFloat(a[field]) > parseFloat(b[field])) ? 1 : ((parseFloat(b[field]) > parseFloat(a[field])) ? -1 : 0))
  else if (field === 'duration')
    koops.sort((a, b) => {
      let aDuration = getTime(a.start, a.end, false),
        bDuration = getTime(b.start, b.end, false)
      return (aDuration > bDuration) ? 1 : ((bDuration > aDuration) ? -1 : 0)
    })
  else if (field !== 'children')
    koops.sort((a, b) => (a[field].length > b[field].length) ? 1 : ((b[field].length > a[field].length) ? -1 : 0))
  else
    koops.sort((a, b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
  return {
    koops   : koops ? helpers.clone(koops.reverse()) : null,
    sortedBy: field
  }
}

export {
  getDistanceBetween,
  getKoops,
  getUserLocation,
  getTime,
  getImage,

  setAllKoopDistance,
  setAllKoopTime,
  setAllKoopImage,
  setAllKoopChildren,
  setAllKoopData,

  isVisibleKoop,
  isCurrentSortedBy,
  sortBy

}
