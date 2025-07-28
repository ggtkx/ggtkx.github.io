const body = document.querySelector('body')
const menuTrigger = document.querySelector('#toggle-main-menu-mobile')
const menuContainer = document.querySelector('#main-menu-mobile')

menuTrigger.onclick = function () {
  menuContainer.classList.toggle('open')
  menuTrigger.classList.toggle('is-active')
  body.classList.toggle('lock-scroll')
}

document.addEventListener('DOMContentLoaded', () => {
  const nowMs = Date.now();

  document.querySelectorAll('.event[data-datetime]').forEach(el => {
    // parse the event date (add 1 day = 86400 sec if you want “until end of day”)
    const dt = new Date(el.dataset.datetime);
    const eventMs = dt.getTime();

    // if the event’s end-of-day is in the past, remove or hide it
    if (eventMs < nowMs) {
      el.remove()
    }
  });
});
