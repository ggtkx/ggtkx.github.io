/* eslint-disable require-jsdoc */
const body = document.querySelector('body');
const menuTrigger = document.querySelector('#toggle-main-menu-mobile');
const menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
  menuContainer.classList.toggle('open');
  menuTrigger.classList.toggle('is-active');
  body.classList.toggle('lock-scroll');
};

const events = [
  {
    datetime: '2026-03-07T19:30:00-08:00',
    image: 'https://www.eventbrite.com/e/_next/image?url=https%3A%2F%2Fimg.evbuc.com%2Fhttps%253A%252F%252Fcdn.evbuc.com%252Fimages%252F1176502497%252F1173183678353%252F1%252Foriginal.20260202-215011%3Fcrop%3Dfocalpoint%26fit%3Dcrop%26w%3D940%26auto%3Dformat%252Ccompress%26q%3D75%26sharp%3D10%26fp-x%3D0.32%26fp-y%3D0.441%26s%3De229e6e86362a5986ec8dcf45125524a&w=940&q=75',
    address: 'Louis B. Mayer Theatre, Santa Clara, CA',
    address_url: 'https://maps.google.com/?q=Louis+B+Mayer+Theatre+Santa+Clara+CA',
    button_link: 'https://www.eventbrite.com/e/1982234233954',
  },
  {
    datetime: '2026-03-14T19:30:00-07:00',
    image: 'https://i.imgur.com/a8YgObZ.jpeg',
    address: '1522 S Winchester Blvd, San Jose',
    address_url: 'https://maps.google.com/?q=1522+S+Winchester+Blvd,+San+Jose,+CA',
    button_link: 'https://huifeidexin.eventbrite.com',
  },
  {
    datetime: '2026-04-03T20:00:00-07:00',
    image: 'https://i.imgur.com/CxPkvg1.jpeg',
    address: 'Cubberley Theatre, Palo Alto',
    address_url: 'https://maps.google.com/?q=Cubberley+Theatre+Palo+Alto+CA',
    button_link: 'https://springcomedy26.eventbrite.com',
  },
];

function formatDateTime(isoString) {
  const dt = new Date(isoString);

  const datePart = new Intl.DateTimeFormat('zh-CN', {
    dateStyle: 'full',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  }).formatToParts(dt);

  const filtered = datePart
      .filter((p) => p.type !== 'weekday' && p.type !== 'year')
      .map((p) => (p.value !== '年' ? p.value : undefined))
      .join('');

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  }).format(dt); // e.g. "7:30 PM"

  return `${filtered} ${timePart}`;
}

function renderEvents(data) {
  const container = document.getElementById('events-container');
  const nowMs = Date.now();

  if (data.length !== 0) {
    const header = document.createElement('h2');
    header.innerText = '近期演出';
    container.appendChild(header);
  }

  data.forEach((evt) => {
    const eventDate = new Date(evt.datetime);
    const eventMs = eventDate.getTime();
    // skip past events
    if (eventMs < nowMs) return;

    // build the wrapper
    const wrap = document.createElement('div');
    wrap.className = 'event';
    wrap.dataset.datetime = evt.datetime;

    // optional image
    if (evt.image) {
      const img = document.createElement('img');
      img.src = evt.image;
      img.alt = '硅谷脱口秀：硅谷地区汉语喜剧社团！';
      img.className = 'intro-image intro-image-absolute';
      wrap.appendChild(img);
    }

    // call box
    const call = document.createElement('div');
    call.className = 'call';

    // top row: time + location
    const top = document.createElement('div');
    top.className = 'call-box-top';

    const timeDiv = document.createElement('div');
    timeDiv.className = 'call-phone';
    timeDiv.innerHTML = `<strong>时间：</strong>${formatDateTime(evt.datetime)}`;
    top.appendChild(timeDiv);

    const locDiv = document.createElement('div');
    locDiv.className = 'call-email';
    locDiv.innerHTML = `<strong>地点：</strong>`;
    const aLoc = document.createElement('a');
    aLoc.href = evt.address_url || '#';
    aLoc.textContent = evt.address;
    locDiv.appendChild(aLoc);
    top.appendChild(locDiv);

    call.appendChild(top);

    // bottom row: buttons
    const bottom = document.createElement('div');
    bottom.className = 'call-box-bottom';

    if (evt.button_link) {
      const buy = document.createElement('a');
      buy.href = evt.button_link;
      buy.className = 'primary button';
      buy.textContent = evt.button_text || '购票';
      bottom.appendChild(buy);
    }


    call.appendChild(bottom);
    wrap.appendChild(call);

    // spacing
    const spacer = document.createElement('div');
    spacer.style.marginBottom = '20px';
    wrap.appendChild(spacer);

    container.appendChild(wrap);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderEvents(events);
});
