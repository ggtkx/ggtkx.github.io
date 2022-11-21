const body = document.querySelector('body');
const menuTrigger = document.querySelector('#toggle-main-menu-mobile');
const menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
  menuContainer.classList.toggle('open');
  menuTrigger.classList.toggle('is-active');
  body.classList.toggle('lock-scroll');
};

function openTab(evt) {
  const tabContents = document.getElementsByClassName('tab-content');
  for (const tabContent of tabContents) {
    tabContent.style.display = 'none';
  }
  const tabLinks = document.getElementsByClassName('tab-links');
  for (const tabLink of tabLinks) {
    tabLink.classList.remove('active');
  }
  const tabName = evt.currentTarget.dataset.tabId;
  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

// Get the element with class="default-open" and click on it
const defaultOpenTabs = document.getElementsByClassName('default-open');
for (const defaultOpenTab of defaultOpenTabs) {
  defaultOpenTab.click();
}
