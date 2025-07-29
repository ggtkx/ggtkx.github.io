const body = document.querySelector('body')
const menuTrigger = document.querySelector('#toggle-main-menu-mobile')
const menuContainer = document.querySelector('#main-menu-mobile')

menuTrigger.onclick = function () {
  menuContainer.classList.toggle('open')
  menuTrigger.classList.toggle('is-active')
  body.classList.toggle('lock-scroll')
}

const events = [
  {
    datetime: "2025-07-27T19:30:00-07:00",
    image: "https://i.imgur.com/hBXlnJK.jpeg",
    address: "线上",
    additional_link: "https://forms.gle/4jcj9EcoYaCH7m3t5",
    additional_label: "报名链接"
  },
  {
    datetime: "2025-08-02T19:30:00-07:00",
    image: "https://i.imgur.com/z7SR3pB.jpeg",
    address: "Silicomedy, 1054 S De Anza Blvd, San Jose",
    address_url: "https://maps.app.goo.gl/x6qPw4hSptWtWEEN6",
    tickets_link: "https://Silicomedy0802.eventbrite.com/"
  },
  {
    datetime: "2025-09-13T19:30:00-07:00",
    image: "https://i.imgur.com/tsolgXB.jpeg",
    address: "Hillsdale Little Theater, 651 31st Ave, San Mateo, CA",
    address_url: "https://maps.app.goo.gl/YPy6Gv2cHFK4usoW6",
    tickets_link: "https://zhaoshiyong.eventbrite.com/"
  }
  ];

function formatDateTime(isoString) {
  const dt = new Date(isoString);

  const datePart = new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "full",
    hour12:   true,
    timeZone: 'America/Los_Angeles'
  }).formatToParts(dt);

  const filtered = datePart
      .filter(p => p.type !== "weekday" && p.type !== "year")
      .map(p => (p.value !== '年' ? p.value : undefined))
      .join("");

  const timePart = new Intl.DateTimeFormat('en-US', {
    hour:     'numeric',
    minute:   '2-digit',
    hour12:   true,
    timeZone: 'America/Los_Angeles'
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

  data.forEach(evt => {
    const eventDate = new Date(evt.datetime);
    const eventMs = eventDate.getTime()
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

    if (evt.tickets_link) {
      const buy = document.createElement('a');
      buy.href = evt.tickets_link;
      buy.className = 'primary button';
      buy.textContent = '购票';
      bottom.appendChild(buy);
    }
    if (evt.additional_link) {
      const extra = document.createElement('a');
      extra.href = evt.additional_link;
      extra.className = 'primary button';
      extra.textContent = evt.additional_label;
      bottom.appendChild(extra);
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
