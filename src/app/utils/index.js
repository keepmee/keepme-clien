import moment  from 'moment'
import helpers from "../helpers";

const scroll = (to, offset = 0, speed = 1000, animate = true) => {
  if (animate) {
    $('html, body').animate({
      scrollTop: $(to).offset().top - (40 + offset)
    }, speed);
  }
  // else $(window).scroll($(to).offset().top - 100)
};

const scrollPosition = () => {
  let sections = $('.section-container'), scrollPosition = $(window).scrollTop(), current = null;

  if (sections)
    sections.each((index, section) => {
      if ($(section).offset().top < (scrollPosition + 200))
        current = $(section).attr('id')
    });
  return current
};

const formatNumber = (value) => {
  if (value === null) return value
  else {
    value = value.replace("+33", '0')
    value = value.replace(/[^0-9\s]/gi, '')

    if (value.substr(0, 3) === "+33")
      value = `0${value.substr(3)}`

    if (value[0] !== "0")
      value = `0${value}`

    if (value.length > 10)
      return value.substr(0, 10).replace(/(.{2})(?!$)/g, "$1-")
    return value.replace(/(.{2})(?!$)/g, "$1-")
  }
};

const date = {
  diff(start = null, end = null, format = true) {
    let minutes = helpers.moment(end).diff(helpers.moment(start), 'minutes')
    return start && end ? formatHoursAndMinutes(parseInt(minutes / 60), parseInt(minutes % 60)) : null
  }
}

const formatTime = (date) => {
  return `${helpers.twoDigits(date.hours())}h${helpers.twoDigits(date.minutes())}`
};

const formatHoursAndMinutes = (hours, minutes) => {
  return `${helpers.twoDigits(hours)}h${helpers.twoDigits(minutes)}`
}

const jsonParse = (text) => {
  try {
    return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) ? JSON.parse(text) : null
  } catch (e) {
    return null
  }
};

export {
  scroll,
  scrollPosition,
  formatNumber,
  jsonParse,
  date
}
